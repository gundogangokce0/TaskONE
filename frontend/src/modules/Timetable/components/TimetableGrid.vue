<template>
  <div class="timetable-grid-card">
    <table class="matrix-table">
      <!-- Table Header: Days of the Week -->
      <thead>
        <tr>
          <th class="time-header-col">⏰ Hour / Day</th>
          <th v-for="day in days" :key="day" class="day-col">
            <div class="day-header-cell">
              <span class="day-name">{{ getDayLabel(day) }}</span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Table Body: Lesson Periods (Rows) -->
      <tbody>
        <tr v-for="period in periods" :key="period.hour">
          <!-- Time Period Cell -->
          <td class="time-cell">
            <div class="time-badge">
              <span class="period-num">P{{ period.hour }}</span>
              <span class="period-time">{{ period.timeString }}</span>
            </div>
          </td>

          <!-- Day Columns for this Period -->
          <td v-for="day in days" :key="day" class="slot-cell">
            <!-- Occupied Slot Course Card -->
            <div 
              v-if="getEntry(day, period.hour)" 
              class="course-card"
              :class="`theme-${getEntry(day, period.hour)!.colorTheme}`"
            >
              <div class="card-header">
                <span class="course-title">{{ getEntry(day, period.hour)!.courseName }}</span>
                <span v-if="getEntry(day, period.hour)!.isLab" class="lab-pill" title="Lab Required">🔬 Lab</span>
              </div>

              <div class="card-body">
                <div class="teacher-info">
                  <span class="info-icon">👨‍🏫</span>
                  <span>{{ getEntry(day, period.hour)!.teacherTitle }} {{ getEntry(day, period.hour)!.teacherName }}</span>
                </div>
                <div class="class-info">
                  <span class="info-icon">👥</span>
                  <span>{{ getEntry(day, period.hour)!.className }}</span>
                </div>
              </div>

              <div class="card-footer">
                <span class="room-badge">🏛️ {{ getEntry(day, period.hour)!.classroomName }}</span>
              </div>
            </div>

            <!-- Empty Slot Placeholder -->
            <div v-else class="empty-slot">
              <span class="empty-text">+ Empty</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { TimetableEntry } from '../services'
import { t } from '../../../i18n'

const props = defineProps<{
  entries: TimetableEntry[]
}>()

const days: Array<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
]

const periods = [
  { hour: 1, timeString: '09:00 - 09:50' },
  { hour: 2, timeString: '10:00 - 10:50' },
  { hour: 3, timeString: '11:00 - 11:50' },
  { hour: 4, timeString: '13:00 - 13:50' },
  { hour: 5, timeString: '14:00 - 14:50' },
  { hour: 6, timeString: '15:00 - 15:50' }
]

const getEntry = (day: string, hour: number) => {
  return props.entries.find(e => e.day === day && e.hour === hour)
}

const getDayLabel = (day: string) => {
  switch (day) {
    case 'Monday': return t.value.monday
    case 'Tuesday': return t.value.tuesday
    case 'Wednesday': return t.value.wednesday
    case 'Thursday': return t.value.thursday
    case 'Friday': return t.value.friday
    default: return day
  }
}
</script>

<style scoped>
.timetable-grid-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(16px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
}

.matrix-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.time-header-col {
  width: 110px;
  background: rgba(15, 23, 42, 0.9);
  padding: 16px 12px;
  color: #64748b;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.day-col {
  background: rgba(15, 23, 42, 0.85);
  padding: 16px 12px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.day-col:last-child {
  border-right: none;
}

.day-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.03em;
}

.time-cell {
  background: rgba(15, 23, 42, 0.6);
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.time-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.period-num {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
}

.period-time {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 500;
}

.slot-cell {
  padding: 8px;
  height: 110px;
  vertical-align: top;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.slot-cell:last-child {
  border-right: none;
}

/* Course Cards Themes & Styling */
.course-card {
  height: 100%;
  border-radius: 12px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.course-card:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
}

/* Purple Theme */
.theme-purple {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(147, 51, 234, 0.15) 100%);
  border: 1px solid rgba(168, 85, 247, 0.4);
}
.theme-purple:hover {
  border-color: #c084fc;
}

/* Blue Theme */
.theme-blue {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.15) 100%);
  border: 1px solid rgba(59, 130, 246, 0.4);
}
.theme-blue:hover {
  border-color: #60a5fa;
}

/* Emerald Theme */
.theme-emerald {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.15) 100%);
  border: 1px solid rgba(16, 185, 129, 0.4);
}
.theme-emerald:hover {
  border-color: #34d399;
}

/* Amber Theme */
.theme-amber {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.15) 100%);
  border: 1px solid rgba(245, 158, 11, 0.4);
}
.theme-amber:hover {
  border-color: #fbbf24;
}

/* Rose Theme */
.theme-rose {
  background: linear-gradient(135deg, rgba(244, 63, 94, 0.25) 0%, rgba(225, 29, 72, 0.15) 100%);
  border: 1px solid rgba(244, 63, 94, 0.4);
}
.theme-rose:hover {
  border-color: #fb7185;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
}

.course-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
}

.lab-pill {
  background: rgba(168, 85, 247, 0.3);
  color: #e9d5ff;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 10px;
  border: 1px solid rgba(168, 85, 247, 0.5);
  white-space: nowrap;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 4px 0;
}

.teacher-info, .class-info {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: #cbd5e1;
}

.info-icon {
  font-size: 0.75rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.room-badge {
  font-size: 0.7rem;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(15, 23, 42, 0.6);
  padding: 2px 6px;
  border-radius: 6px;
}

.empty-slot {
  height: 100%;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.empty-slot:hover {
  border-color: rgba(99, 102, 241, 0.4);
  background: rgba(99, 102, 241, 0.05);
}

.empty-text {
  font-size: 0.72rem;
  color: #475569;
  font-weight: 500;
}

.empty-slot:hover .empty-text {
  color: #818cf8;
}
</style>
