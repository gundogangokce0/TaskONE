<template>
  <div class="card form-card">
    <h3>{{ isEditing ? 'Edit Time Slot' : 'Add New Time Slot' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="daySelect">Day of the Week (Haftanın Günü)</label>
        <select id="daySelect" v-model="form.day" class="form-control" required>
          <option value="" disabled>Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <div class="form-group">
        <label for="hourInput">Period / Hour of Day (Ders Saati: 1 - 10)</label>
        <input
          id="hourInput"
          v-model.number="form.hour"
          type="number"
          min="1"
          max="12"
          class="form-control"
          placeholder="e.g. 1 (1st Period), 2 (2nd Period)"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Time Slot' : 'Save Time Slot' }}
        </button>
        <button v-if="isEditing" type="button" class="btn btn-secondary" @click="$emit('cancel')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { TimeSlot } from '../services'

const props = defineProps<{
  selectedSlot?: TimeSlot | null
  isEditing?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', payload: TimeSlot): void
  (e: 'cancel'): void
}>()

const form = reactive<TimeSlot>({
  day: 'Monday',
  hour: 1
})

watch(
  () => props.selectedSlot,
  (newVal) => {
    if (newVal) {
      form.day = newVal.day
      form.hour = newVal.hour
    } else {
      form.day = 'Monday'
      form.hour = 1
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', { ...form })
  if (!props.isEditing) {
    form.day = 'Monday'
    form.hour = 1
  }
}
</script>

<style scoped>
.form-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
}

.form-card h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #fff;
  font-size: 1.25rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #fff;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}
</style>
