<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('cancel')">
      <div class="modal-card">
        <!-- Header -->
        <div class="modal-header">
          <div class="header-title">
            <span class="header-icon">{{ isEditing ? '✏️' : '🏫' }}</span>
            <h3>{{ title || (isEditing ? t.editClassroomModalTitle : t.addClassroomModalTitle) }}</h3>
          </div>
          <button class="btn-close" @click="$emit('cancel')" :title="t.close">✕</button>
        </div>

        <!-- Body Form -->
        <form @submit.prevent="handleSubmit" class="modal-body">
          <div class="form-section">
            <div class="section-header">
              <span class="section-icon">🏛️</span>
              <h4>{{ t.sectionClassroomInfo }}</h4>
            </div>

            <div class="form-group">
              <label for="classroomName">{{ t.lblClassroomName }}</label>
              <input
                id="classroomName"
                v-model="form.name"
                type="text"
                class="form-control"
                placeholder="e.g. Auditorium A, Lab 101, Oda 204"
                required
              />
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input
                  v-model="form.is_lab"
                  type="checkbox"
                  class="checkbox-input"
                />
                <span>🖥️ {{ t.lblIsLabRoom }}</span>
              </label>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
              {{ t.cancel }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? t.update : t.save }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Classroom } from '../services'
import { t } from '../../../i18n'

const props = defineProps<{
  isOpen?: boolean
  title?: string
  selectedClassroom?: Classroom | null
  isEditing?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', payload: Classroom): void
  (e: 'cancel'): void
}>()

const form = reactive<Classroom>({
  name: '',
  is_lab: false
})

const resetForm = () => {
  form.name = ''
  form.is_lab = false
}

watch(
  () => props.selectedClassroom,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name || ''
      form.is_lab = newVal.is_lab || false
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', { ...form })
  if (!props.isEditing) {
    resetForm()
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
  animation: fadeIn 0.25s ease-out;
}

.modal-card {
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 1.3rem;
}

.header-title h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
}

.btn-close {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #94a3b8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.modal-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-section {
  background: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 18px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.section-icon {
  font-size: 1rem;
}

.section-header h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #818cf8;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 6px;
}

.form-control {
  width: 100%;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.form-control:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.checkbox-group {
  margin-top: 16px;
  margin-bottom: 0;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
}

.btn {
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
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
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
