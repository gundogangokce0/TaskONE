<template>
  <div class="table-card">
    <div v-if="timeSlots.length === 0" class="empty-state">
      <div class="empty-icon">⏰</div>
      <p>{{ t.emptyTimeSlots }}</p>
    </div>

    <table v-else class="custom-table">
      <thead>
        <tr>
          <th>{{ t.colDayOfWeek }}</th>
          <th>{{ t.colLessonPeriod }}</th>
          <th class="text-right">{{ t.actions }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="slot in timeSlots" :key="slot.id">
          <td>
            <span class="badge badge-day">📅 {{ slot.day }}</span>
          </td>

          <td>
            <span class="badge badge-hour">⏰ Period {{ slot.hour }}</span>
          </td>

          <td class="text-right">
            <button class="btn-icon btn-edit" @click="$emit('edit', slot)" :title="t.edit">
              ✏️ {{ t.edit }}
            </button>
            <button class="btn-icon btn-delete" @click="slot.id && $emit('delete', slot.id)" :title="t.delete">
              🗑️ {{ t.delete }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TimeSlot } from '../services'
import { t } from '../../../i18n'

defineProps<{
  timeSlots: TimeSlot[]
}>()

defineEmits<{
  (e: 'edit', timeSlot: TimeSlot): void
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

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 500;
}

.badge-day {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.badge-hour {
  background: rgba(234, 179, 8, 0.15);
  color: #fde047;
  border: 1px solid rgba(234, 179, 8, 0.3);
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
