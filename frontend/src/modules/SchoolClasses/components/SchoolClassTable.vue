<template>
  <div class="table-card">
    <div v-if="schoolClasses.length === 0" class="empty-state">
      <p>No school classes found. Add your first class above!</p>
    </div>

    <table v-else class="custom-table">
      <thead>
        <tr>
          <th>Class / Section Name</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in schoolClasses" :key="item.id">
          <td class="font-medium">
            <span class="class-icon">👥</span> {{ item.name }}
          </td>
          <td class="text-right">
            <button class="btn-icon btn-edit" @click="$emit('edit', item)" title="Edit Class">
              ✏️ Edit
            </button>
            <button class="btn-icon btn-delete" @click="item.id && $emit('delete', item.id)" title="Delete Class">
              🗑️ Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { SchoolClass } from '../services'

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
  padding: 40px;
  text-align: center;
  color: #94a3b8;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.custom-table th {
  background: rgba(15, 23, 42, 0.8);
  padding: 16px 24px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.custom-table td {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  font-size: 0.95rem;
}

.custom-table tr:last-child td {
  border-bottom: none;
}

.custom-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.font-medium {
  font-weight: 600;
  color: #fff;
}

.class-icon {
  margin-right: 8px;
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
  margin-left: 8px;
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
