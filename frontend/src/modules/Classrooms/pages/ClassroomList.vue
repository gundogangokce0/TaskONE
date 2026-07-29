<template>
  <div class="classrooms-page">
    <div class="page-header">
      <h2>🏫 Classroom Management</h2>
      <p>Add, update, or remove classrooms and set laboratory designations.</p>
    </div>

    <!-- Alert Notifications -->
    <div v-if="errorMessage" class="alert alert-error">
      <span>{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      <span>{{ successMessage }}</span>
    </div>

    <!-- Classroom Form Component -->
    <ClassroomForm
      :selected-classroom="selectedClassroom"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="cancelEdit"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading classrooms...</p>
    </div>

    <!-- Classroom Table Component -->
    <ClassroomTable
      v-else
      :classrooms="classrooms"
      @edit="startEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ClassroomForm from '../components/ClassroomForm.vue'
import ClassroomTable from '../components/ClassroomTable.vue'
import { classroomService, type Classroom } from '../services'

const classrooms = ref<Classroom[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const selectedClassroom = ref<Classroom | null>(null)
const isEditing = ref(false)

// 1. Fetch Classrooms on Component Mount
const fetchClassrooms = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    classrooms.value = await classroomService.getClassrooms()
  } catch (err: any) {
    errorMessage.value = 'Failed to load classrooms from backend.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchClassrooms()
})

// 2. Handle Save (Create or Update)
const handleSave = async (payload: Classroom) => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (isEditing.value && selectedClassroom.value?.id) {
      await classroomService.updateClassroom(selectedClassroom.value.id, payload)
      successMessage.value = 'Classroom updated successfully!'
    } else {
      await classroomService.createClassroom(payload)
      successMessage.value = 'Classroom created successfully!'
    }
    cancelEdit()
    await fetchClassrooms()
  } catch (err: any) {
    errorMessage.value = err.response?.data?.detail || 'An error occurred while saving classroom.'
  }
}

// 3. Start Editing a Classroom
const startEdit = (classroom: Classroom) => {
  selectedClassroom.value = classroom
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 4. Cancel Edit Mode
const cancelEdit = () => {
  selectedClassroom.value = null
  isEditing.value = false
}

// 5. Handle Delete
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this classroom?')) return

  errorMessage.value = ''
  successMessage.value = ''
  try {
    await classroomService.deleteClassroom(id)
    successMessage.value = 'Classroom deleted successfully!'
    await fetchClassrooms()
  } catch (err: any) {
    errorMessage.value = 'Failed to delete classroom.'
  }
}
</script>

<style scoped>
.classrooms-page {
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
