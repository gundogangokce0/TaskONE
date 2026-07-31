<template>
  <!-- Modal Overlay Backdrop -->
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('cancel')">
      <!-- Modal Dialog Window Card -->
      <div class="modal-card">
        <!-- Modal Header with Title & Close Button -->
        <div class="modal-header">
          <div class="header-title">
            <span class="header-icon">{{ isEditing ? '✏️' : '👨‍🏫' }}</span>
            <h3>{{ title || (isEditing ? t.editTeacherModalTitle : t.addTeacherModalTitle) }}</h3>
          </div>
          <button class="btn-close" @click="$emit('cancel')" :title="t.close">✕</button>
        </div>

        <!-- Modal Body Form -->
        <form @submit.prevent="handleSubmit" class="modal-body">
          
          <!-- SECTION 1: Personal & Contact Information -->
          <div class="form-section">
            <div class="section-header">
              <span class="section-icon">👤</span>
              <h4>{{ t.sectionPersonal }}</h4>
            </div>
            
            <div class="form-grid grid-2">
              <div class="form-group">
                <label for="titleSelect">{{ t.lblTitle }}</label>
                <select id="titleSelect" v-model="form.title" class="form-control">
                  <option value="Prof. Dr.">Prof. Dr.</option>
                  <option value="Doç. Dr.">Doç. Dr.</option>
                  <option value="Dr. Öğr. Üyesi">Dr. Öğr. Üyesi</option>
                  <option value="Öğr. Gör.">Öğr. Gör.</option>
                  <option value="Arş. Gör.">Arş. Gör.</option>
                </select>
              </div>

              <div class="form-group">
                <label for="teacherName">{{ t.lblName }}</label>
                <input
                  id="teacherName"
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  placeholder="e.g. John Doe / Ahmet Yılmaz"
                  required
                />
              </div>

              <div class="form-group">
                <label for="teacherEmail">{{ t.lblEmail }}</label>
                <input
                  id="teacherEmail"
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  placeholder="john.doe@university.edu"
                />
              </div>

              <div class="form-group">
                <label for="teacherPhone">{{ t.lblPhone }}</label>
                <input
                  id="teacherPhone"
                  v-model="form.phone"
                  type="tel"
                  class="form-control"
                  placeholder="+1 (555) 019-2834 / 0532 123 45 67"
                />
              </div>
            </div>
          </div>

          <!-- SECTION 2: Academic & Department Information -->
          <div class="form-section">
            <div class="section-header">
              <span class="section-icon">🎓</span>
              <h4>{{ t.sectionAcademic }}</h4>
            </div>
            
            <div class="form-grid grid-2">
              <div class="form-group">
                <label for="teacherDept">{{ t.lblDepartment }}</label>
                <input
                  id="teacherDept"
                  v-model="form.department"
                  type="text"
                  class="form-control"
                  placeholder="e.g. Software Engineering"
                />
              </div>

              <div class="form-group">
                <label for="officeNo">{{ t.lblOffice }}</label>
                <input
                  id="officeNo"
                  v-model="form.office_number"
                  type="text"
                  class="form-control"
                  placeholder="e.g. B-204"
                />
              </div>
            </div>
          </div>

          <!-- SECTION 3: Work Schedule & Constraint Rules -->
          <div class="form-section">
            <div class="section-header">
              <span class="section-icon">📅</span>
              <h4>{{ t.sectionSchedule }}</h4>
            </div>
            
            <div class="form-grid grid-2">
              <div class="form-group">
                <label for="offDay">{{ t.lblOffDay }}</label>
                <select id="offDay" v-model="form.off_day" class="form-control" required>
                  <option value="Monday">Monday (Pazartesi)</option>
                  <option value="Tuesday">Tuesday (Salı)</option>
                  <option value="Wednesday">Wednesday (Çarşamba)</option>
                  <option value="Thursday">Thursday (Perşembe)</option>
                  <option value="Friday">Friday (Cuma)</option>
                  <option value="Saturday">Saturday (Cumartesi)</option>
                  <option value="Sunday">Sunday (Pazar)</option>
                </select>
              </div>

              <div class="form-group">
                <label for="maxHours">{{ t.lblMaxHours }}</label>
                <input
                  id="maxHours"
                  v-model.number="form.max_daily_hours"
                  type="number"
                  min="1"
                  max="12"
                  class="form-control"
                  placeholder="6"
                />
              </div>
            </div>
          </div>

          <!-- Modal Footer Actions -->
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
import type { Teacher } from '../services'
import { t } from '../../../i18n'

const props = defineProps<{
  isOpen?: boolean
  title?: string
  selectedTeacher?: Teacher | null
  isEditing?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', payload: Teacher): void
  (e: 'cancel'): void
}>()

const form = reactive<Teacher>({
  name: '',
  title: 'Prof. Dr.',
  email: '',
  phone: '',
  department: '',
  office_number: '',
  off_day: 'Monday',
  max_daily_hours: 6
})

const resetForm = () => {
  form.name = ''
  form.title = 'Prof. Dr.'
  form.email = ''
  form.phone = ''
  form.department = ''
  form.office_number = ''
  form.off_day = 'Monday'
  form.max_daily_hours = 6
}

watch(
  () => props.selectedTeacher,
  (newVal) => {
    if (newVal) {
      form.name = newVal.name || ''
      form.title = newVal.title || 'Prof. Dr.'
      form.email = newVal.email || ''
      form.phone = newVal.phone || ''
      form.department = newVal.department || ''
      form.office_number = newVal.office_number || ''
      form.off_day = newVal.off_day || 'Monday'
      form.max_daily_hours = newVal.max_daily_hours || 6
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
  max-width: 650px;
  max-height: 90vh;
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
  font-size: 1.2rem;
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
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

.form-grid {
  display: grid;
  gap: 14px;
}

.grid-2 {
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 600px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a3b8;
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

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  margin-top: 8px;
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
