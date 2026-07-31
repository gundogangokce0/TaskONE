<template>
  <div class="table-card">
    <div v-if="teachers.length === 0" class="empty-state">
      <div class="empty-icon">👨‍🏫</div>
      <p>{{ t.emptyTeachers }}</p>
    </div>

    <table v-else class="custom-table">
      <thead>
        <tr>
          <th>{{ t.colTeacherInfo }}</th>
          <th>{{ t.colDept }}</th>
          <th>{{ t.colContact }}</th>
          <th>{{ t.colSchedule }}</th>
          <th class="text-right">{{ t.actions }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <!-- 1. Name & Title & Office -->
          <td>
            <div class="teacher-main-info">
              <span class="teacher-title-badge">{{ teacher.title || 'Prof. Dr.' }}</span>
              <span class="teacher-name">{{ teacher.name }}</span>
            </div>
            <div v-if="teacher.office_number" class="office-subtext">
              🏢 Room: {{ teacher.office_number }}
            </div>
          </td>

          <!-- 2. Department / Branch -->
          <td>
            <span class="badge badge-dept">
              🎓 {{ teacher.department || 'General' }}
            </span>
          </td>

          <!-- 3. Contact Info -->
          <td>
            <div class="contact-info">
              <span v-if="teacher.email" class="contact-item">✉️ {{ teacher.email }}</span>
              <span v-if="teacher.phone" class="contact-item">📞 {{ teacher.phone }}</span>
              <span v-if="!teacher.email && !teacher.phone" class="contact-empty">-</span>
            </div>
          </td>

          <!-- 4. Off Day & Max Daily Hours -->
          <td>
            <div class="schedule-badges">
              <span class="badge badge-day">📅 {{ teacher.off_day }}</span>
              <span class="badge badge-hours">⏰ Max {{ teacher.max_daily_hours || 6 }} Hours</span>
            </div>
          </td>

          <!-- 5. Actions -->
          <td class="text-right">
            <button class="btn-icon btn-edit" @click="$emit('edit', teacher)" :title="t.edit">
              ✏️ {{ t.edit }}
            </button>
            <button class="btn-icon btn-delete" @click="teacher.id && $emit('delete', teacher.id)" :title="t.delete">
              🗑️ {{ t.delete }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Teacher } from '../services'
import { t } from '../../../i18n'

defineProps<{
  teachers: Teacher[]
}>()

defineEmits<{
  (e: 'edit', teacher: Teacher): void
  (e: 'delete', id: string): void
}>()
</script>

<style scoped>
.table-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.empty-state {
  padding: 48px 20px;
  text-align: center;
  color: #94a3b8;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th {
  background: rgba(15, 23, 42, 0.8);
  padding: 16px 20px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.custom-table td {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 0.92rem;
  vertical-align: middle;
}

.custom-table tr:last-child td {
  border-bottom: none;
}

.custom-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.teacher-main-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.teacher-title-badge {
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
}

.teacher-name {
  font-weight: 600;
  color: #fff;
}

.office-subtext {
  font-size: 0.78rem;
  color: #64748b;
  margin-top: 4px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
}

.badge-dept {
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.badge-day {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.badge-hours {
  background: rgba(234, 179, 8, 0.15);
  color: #fde047;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-item {
  font-size: 0.82rem;
  color: #94a3b8;
}

.contact-empty {
  color: #64748b;
}

.schedule-badges {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.text-right {
  text-align: right;
}

.btn-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  margin-left: 6px;
  transition: all 0.2s ease;
}

.btn-edit {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
}

.btn-edit:hover {
  background: rgba(56, 189, 248, 0.2);
}

.btn-delete {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
}

.btn-delete:hover {
  background: rgba(248, 113, 113, 0.2);
}
</style>
