<template>
  <div class="time-slots-page">
    <div class="page-header">
      <h2>⏰ Time Slot Management</h2>
      <p>Add, update, or remove timetable periods and daily schedule slots.</p>
    </div>

    <!-- Alert Notifications -->
    <div v-if="errorMessage" class="alert alert-error">
      <span>{{ errorMessage }}</span>
    </div>
    <div v-if="successMessage" class="alert alert-success">
      <span>{{ successMessage }}</span>
    </div>

    <!-- TimeSlot Form Component -->
    <TimeSlotForm
      :selected-slot="selectedSlot"
      :is-editing="isEditing"
      @save="handleSave"
      @cancel="cancelEdit"
    />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading time slots...</p>
    </div>

    <!-- TimeSlot Table Component -->
    <TimeSlotTable
      v-else
      :time-slots="timeSlots"
      @edit="startEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TimeSlotForm from '../components/TimeSlotForm.vue'
import TimeSlotTable from '../components/TimeSlotTable.vue'
import { timeSlotService, type TimeSlot } from '../services'

const timeSlots = ref<TimeSlot[]>([])
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const selectedSlot = ref<TimeSlot | null>(null)
const isEditing = ref(false)

// 1. Fetch Time Slots on Component Mount
const fetchTimeSlots = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    timeSlots.value = await timeSlotService.getTimeSlots()
  } catch (err: any) {
    errorMessage.value = 'Failed to load time slots from backend.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTimeSlots()
})

// 2. Handle Save (Create or Update)
const handleSave = async (payload: TimeSlot) => {
  errorMessage.value = ''
  successMessage.value = ''
  try {
    if (isEditing.value && selectedSlot.value?.id) {
      await timeSlotService.updateTimeSlot(selectedSlot.value.id, payload)
      successMessage.value = 'Time slot updated successfully!'
    } else {
      await timeSlotService.createTimeSlot(payload)
      successMessage.value = 'Time slot created successfully!'
    }
    cancelEdit()
    await fetchTimeSlots()
  } catch (err: any) {
    errorMessage.value = err.response?.data?.detail || 'An error occurred while saving time slot.'
  }
}

// 3. Start Editing a Time Slot
const startEdit = (item: TimeSlot) => {
  selectedSlot.value = item
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 4. Cancel Edit Mode
const cancelEdit = () => {
  selectedSlot.value = null
  isEditing.value = false
}

// 5. Handle Delete
const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this time slot?')) return

  errorMessage.value = ''
  successMessage.value = ''
  try {
    await timeSlotService.deleteTimeSlot(id)
    successMessage.value = 'Time slot deleted successfully!'
    await fetchTimeSlots()
  } catch (err: any) {
    errorMessage.value = 'Failed to delete time slot.'
  }
}
</script>

<style scoped>
.time-slots-page {
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
