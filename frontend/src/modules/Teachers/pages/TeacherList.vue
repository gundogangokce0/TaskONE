<template>
  <div class="teachers-page">
    <!-- Page Header with Add Teacher Action Button -->
    <div class="page-header">
      <div class="header-text">
        <h2>👨‍🏫 {{ t.teachersTitle }}</h2>
        <p>{{ t.teachersSub }}</p>
      </div>
      <button class="btn btn-add-teacher" @click="openCreateModal">
        <span>➕ {{ t.addTeacherBtn }}</span>
      </button>
    </div>

    <!-- Alert Notifications -->
    <div v-if="errorMessage" class="alert alert-error">
      <span>⚠️ {{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      <span>✅ {{ successMessage }}</span>
    </div>

    <!-- Form Modal Dialog Component (Add / Edit) -->
    <TeacherForm
      :is-open="isModalOpen"
      :title="isEditing ? t.editTeacherModalTitle : t.addTeacherModalTitle"
      :selected-teacher="selectedTeacher"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="closeModal"
    />

    <!-- Shared Reusable Delete Confirmation Modal -->
    <ConfirmDeleteModal
      :is-open="isDeleteModalOpen"
      :title="t.editTeacherModalTitle"
      :message="deleteModalMessage"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Teacher Table Component -->
    <TeacherTable
      v-else
      :teachers="teachers"
      @edit="startEdit"
      @delete="handleDeleteClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TeacherForm from '../components/TeacherForm.vue'
import TeacherTable from '../components/TeacherTable.vue'
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal.vue'
import { teacherService, type Teacher } from '../services'
import { t } from '../../../i18n'

const teachers = ref<Teacher[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Form Modal State (Add / Edit)
const isModalOpen = ref(false)
const selectedTeacher = ref<Teacher | null>(null)
const isEditing = ref(false)

// Delete Modal State
const isDeleteModalOpen = ref(false)
const teacherToDelete = ref<Teacher | null>(null)

const deleteModalMessage = computed(() => {
  if (!teacherToDelete.value) return ''
  const name = `${teacherToDelete.value.title || ''} ${teacherToDelete.value.name}`.trim()
  return `"${name}" ${t.value.confirmDeleteTeacher}`
})

// 1. Fetch Teachers on Component Mount
const fetchTeachers = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    teachers.value = await teacherService.getTeachers()
  } catch (err: any) {
    errorMessage.value = 'Failed to fetch teacher list from backend server.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTeachers()
})

// 2. Open Create Modal
const openCreateModal = () => {
  selectedTeacher.value = null
  isEditing.value = false
  isModalOpen.value = true
}

// 3. Start Edit Modal
const startEdit = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  isEditing.value = true
  isModalOpen.value = true
}

// 4. Close Form Modal
const closeModal = () => {
  isModalOpen.value = false
}

// 5. Handle Save (Create or Update)
const handleSave = async (payload: Teacher) => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (isEditing.value && selectedTeacher.value?.id) {
      await teacherService.updateTeacher(selectedTeacher.value.id, payload)
      successMessage.value = t.value.msgTeacherUpdated
    } else {
      await teacherService.createTeacher(payload)
      successMessage.value = t.value.msgTeacherAdded
    }
    closeModal()
    await fetchTeachers()
  } catch (err: any) {
    errorMessage.value = err.response?.data?.detail || 'An error occurred.'
  }
}

// 6. Handle Delete Button Click -> Open Confirm Delete Modal
const handleDeleteClick = (id: string) => {
  const target = teachers.value.find(t => t.id === id)
  if (target) {
    teacherToDelete.value = target
    isDeleteModalOpen.value = true
  }
}

// 7. Close Delete Modal
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  teacherToDelete.value = null
}

// 8. Confirm Delete Execution
const confirmDelete = async () => {
  if (!teacherToDelete.value?.id) return

  errorMessage.value = ''
  successMessage.value = ''
  try {
    await teacherService.deleteTeacher(teacherToDelete.value.id)
    successMessage.value = t.value.msgTeacherDeleted
    closeDeleteModal()
    await fetchTeachers()
  } catch (err: any) {
    errorMessage.value = 'An error occurred while deleting teacher.'
    closeDeleteModal()
  }
}
</script>

<style scoped>
.teachers-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.header-text h2 {
  font-size: 1.8rem;
  color: #fff;
  margin: 0 0 6px 0;
}

.header-text p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
}

.btn-add-teacher {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #fff;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  transition: all 0.2s ease;
}

.btn-add-teacher:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.alert {
  padding: 14px 18px;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.alert-error {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.alert-success {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #6ee7b7;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #94a3b8;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
