<template>
  <div class="timetable-matrix-page">
    <!-- Header Controls & Actions Bar -->
    <div class="page-header">
      <div class="header-text">
        <h2>📅 {{ t.timetableTitle }}</h2>
        <p>{{ t.timetableSub }}</p>
      </div>

      <div class="header-actions">
        <button class="btn btn-secondary" @click="handlePrint" title="Export / Print PDF">
          <span>🖨️ {{ t.exportPdf }}</span>
        </button>
        <button class="btn btn-primary" @click="handleGenerate" title="Generate AI Timetable">
          <span>⚡ {{ t.generateSchedule }}</span>
        </button>
      </div>
    </div>

    <!-- Filter Control Bar -->
    <div class="filter-card">
      <div class="filter-group">
        <label for="weekSelect">🗓️ {{ t.selectWeek }}</label>
        <select id="weekSelect" v-model="selectedWeek" class="filter-control">
          <option value="week1">Week 1: Feb 02 - Feb 06, 2026 (1. Hafta)</option>
          <option value="week2">Week 2: Feb 09 - Feb 13, 2026 (2. Hafta)</option>
          <option value="week3">Week 3: Feb 16 - Feb 20, 2026 (3. Hafta)</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="classSelect">👥 {{ t.selectClassFilter }}</label>
        <select id="classSelect" v-model="selectedClass" class="filter-control">
          <option value="ALL">{{ t.allClasses }}</option>
          <option value="Yazılım Müh. 1. Sınıf">Yazılım Müh. 1. Sınıf</option>
          <option value="Yazılım Müh. 2. Sınıf">Yazılım Müh. 2. Sınıf</option>
          <option value="Bilgisayar Müh. 1. Sınıf">Bilgisayar Müh. 1. Sınıf</option>
        </select>
      </div>
    </div>

    <!-- Interactive Timetable Grid Component -->
    <TimetableGrid :entries="filteredEntries" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TimetableGrid from '../components/TimetableGrid.vue'
import { mockTimetableData, type TimetableEntry } from '../services'
import { t } from '../../../i18n'

const selectedWeek = ref('week1')
const selectedClass = ref('ALL')
const entries = ref<TimetableEntry[]>(mockTimetableData)

const filteredEntries = computed(() => {
  if (selectedClass.value === 'ALL') {
    return entries.value
  }
  return entries.value.filter(e => e.className === selectedClass.value)
})

const handlePrint = () => {
  window.print()
}

const handleGenerate = () => {
  alert('⚡ AI Schedule Generator: Timetable optimization algorithm triggered successfully!')
}
</script>

<style scoped>
.timetable-matrix-page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.header-text h2 {
  font-size: 1.8rem;
  color: #fff;
  margin: 0 0 6px 0;
}

.header-text p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 18px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  backdrop-filter: blur(12px);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.filter-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #94a3b8;
}

.filter-control {
  width: 100%;
  padding: 10px 14px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  color: #fff;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.filter-control:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.btn {
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

@media print {
  .page-header, .filter-card, .sidebar {
    display: none !important;
  }
  .timetable-matrix-page {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>
