<template>
  <div class="table-card">
    <div v-if="schoolClasses.length === 0" class="empty-state">
      <div class="empty-icon">👥</div>
      <p>{{ t.emptySchoolClasses }}</p>
    </div>

    <table v-else class="custom-table">
      <thead>
        <tr>
          <th>{{ t.colClassName }}</th>
          <th class="text-right">{{ t.actions }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sc in schoolClasses" :key="sc.id">
          <td>
            <div class="class-info">
              <span class="class-name">👥 {{ sc.name }}</span>
            </div>
          </td>

          <td class="text-right">
            <button class="btn-icon btn-edit" @click="$emit('edit', sc)" :title="t.edit">
              ✏️ {{ t.edit }}
            </button>
            <button class="btn-icon btn-delete" @click="sc.id && $emit('delete', sc.id)" :title="t.delete">
              🗑️ {{ t.delete }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { SchoolClass } from '../services'
import { t } from '../../../i18n'

defineProps<{
  schoolClasses: SchoolClass[]
}>()

defineEmits<{
  (e: 'edit', schoolClass: SchoolClass): void
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

.class-info {
  display: flex;
  align-items: center;
}

.class-name {
  font-weight: 600;
  color: #fff;
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
