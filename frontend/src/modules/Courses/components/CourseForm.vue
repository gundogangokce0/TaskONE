<template>
  <div class="card form-card">
    <h3>{{ isEditing ? 'Edit Course' : 'Add New Course' }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="courseName">Course Name</label>
        <input
          id="courseName"
          v-model="form.name"
          type="text"
          class="form-control"
          placeholder="e.g. Database Management Systems"
          required
        />
      </div>

      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input
            v-model="form.is_lab_required"
            type="checkbox"
            class="checkbox-input"
          />
          <span>Requires Computer / Science Lab (Laboratuvar Gerekli)</span>
        </label>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ isEditing ? 'Update Course' : 'Save Course' }}
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
import type { Course } from '../services'

const props = defineProps<{
  selectedCourse?: Course | null
  isEditing?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', payload: Course): void
  (e: 'cancel'): void
}>()

const form = reactive<Course>({
  name: '',
  is_lab_required: false
})

watch(
  () => props.selectedCourse,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name
      form.is_lab_required = newVal.is_lab_required
    } else {
      form.name = ''
      form.is_lab_required = false
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', { ...form })
  if (!props.isEditing) {
    form.name = ''
    form.is_lab_required = false
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

.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
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
