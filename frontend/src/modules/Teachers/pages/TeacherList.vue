<template>
  <div class="teachers-page">
    <div class="page-header">
      <h2>👨‍🏫 Teacher Management</h2>
      <p>Add, update, or remove teachers and manage their off days.</p>
    </div>

    <!-- Alert Notifications -->
    <div v-if="errorMessage" class="alert alert-error">
      <span>{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      <span>{{ successMessage }}</span>
    </div>

    <!-- Teacher Form Component -->
    <TeacherForm
      :selected-teacher="selectedTeacher"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="cancelEdit"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading teachers...</p>
    </div>

    <!-- Teacher Table Component -->
    <TeacherTable
      v-else
      :teachers="teachers"
      @edit="startEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TeacherForm from '../components/TeacherForm.vue'
import TeacherTable from '../components/TeacherTable.vue'
import { teacherService, type Teacher } from '../services'

const teachers = ref<Teacher[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const selectedTeacher = ref<Teacher | null>(null)
const isEditing = ref(false)

// 1. Fetch Teachers on Component Mount
const fetchTeachers = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    teachers.value = await teacherService.getTeachers()
  } catch (err: any) {
    errorMessage.value = 'Failed to load teachers from backend.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTeachers()
})

// 2. Handle Save (Create or Update)
const handleSave = async (payload: Teacher) => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (isEditing.value && selectedTeacher.value?.id) {
      await teacherService.updateTeacher(selectedTeacher.value.id, payload)
      successMessage.value = 'Teacher updated successfully!'
    } else {
      await teacherService.createTeacher(payload)
      successMessage.value = 'Teacher created successfully!'
    }
    cancelEdit()
    await fetchTeachers()
  } catch (err: any) {
    errorMessage.value = err.response?.data?.detail || 'An error occurred while saving teacher.'
  }
}

// 3. Start Editing a Teacher
const startEdit = (teacher: Teacher) => {
  selectedTeacher.value = teacher
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 4. Cancel Edit Mode
const cancelEdit = () => {
  selectedTeacher.value = null
  isEditing.value = false
}

// 5. Handle Delete
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this teacher?')) return

  errorMessage.value = ''
  successMessage.value = ''
  try {
    await teacherService.deleteTeacher(id)
    successMessage.value = 'Teacher deleted successfully!'
    await fetchTeachers()
  } catch (err: any) {
    errorMessage.value = 'Failed to delete teacher.'
  }
}
</script>

<style scoped>
.teachers-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 20px;
}

.page-header {
  margin-bottom: 28px;
}

.page-header h2 {
  font-size: 1.8rem;
  color: #fff;
  margin: 0 0 6px 0;
}

.page-header p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
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
