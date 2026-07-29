<template>
  <div class="school-classes-page">
    <div class="page-header">
      <h2>👥 Class & Section Management</h2>
      <p>Add, update, or remove school classes and grade sections.</p>
    </div>

    <!-- Alert Notifications -->
    <div v-if="errorMessage" class="alert alert-error">
      <span>{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      <span>{{ successMessage }}</span>
    </div>

    <!-- SchoolClass Form Component -->
    <SchoolClassForm
      :selected-class="selectedClass"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="cancelEdit"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading school classes...</p>
    </div>

    <!-- SchoolClass Table Component -->
    <SchoolClassTable
      v-else
      :school-classes="schoolClasses"
      @edit="startEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SchoolClassForm from '../components/SchoolClassForm.vue'
import SchoolClassTable from '../components/SchoolClassTable.vue'
import { schoolClassService, type SchoolClass } from '../services'

const schoolClasses = ref<SchoolClass[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const selectedClass = ref<SchoolClass | null>(null)
const isEditing = ref(false)

// 1. Fetch School Classes on Component Mount
const fetchSchoolClasses = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    schoolClasses.value = await schoolClassService.getSchoolClasses()
  } catch (err: any) {
    errorMessage.value = 'Failed to load school classes from backend.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSchoolClasses()
})

// 2. Handle Save (Create or Update)
const handleSave = async (payload: SchoolClass) => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (isEditing.value && selectedClass.value?.id) {
      await schoolClassService.updateSchoolClass(selectedClass.value.id, payload)
      successMessage.value = 'School class updated successfully!'
    } else {
      await schoolClassService.createSchoolClass(payload)
      successMessage.value = 'School class created successfully!'
    }
    cancelEdit()
    await fetchSchoolClasses()
  } catch (err: any) {
    errorMessage.value = err.response?.data?.detail || 'An error occurred while saving class.'
  }
}

// 3. Start Editing a School Class
const startEdit = (item: SchoolClass) => {
  selectedClass.value = item
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 4. Cancel Edit Mode
const cancelEdit = () => {
  selectedClass.value = null
  isEditing.value = false
}

// 5. Handle Delete
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this class?')) return

  errorMessage.value = ''
  successMessage.value = ''
  try {
    await schoolClassService.deleteSchoolClass(id)
    successMessage.value = 'School class deleted successfully!'
    await fetchSchoolClasses()
  } catch (err: any) {
    errorMessage.value = 'Failed to delete class.'
  }
}
</script>

<style scoped>
.school-classes-page {
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
