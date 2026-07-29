<template>
  <div class="table-card">
    <div v-if="classrooms.length === 0" class="empty-state">
      <p>No classrooms found. Add your first classroom above!</p>
    </div>

    <table v-else class="custom-table">
      <thead>
        <tr>
          <th>Classroom Name</th>
          <th>Type</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in classrooms" :key="room.id">
          <td class="font-medium">{{ room.name }}</td>
          <td>
            <span :class="['badge', room.is_lab ? 'badge-lab-yes' : 'badge-lab-no']">
              {{ room.is_lab ? '🖥️ Laboratory' : '🏛️ Lecture Room' }}
            </span>
          </td>
          <td class="text-right">
            <button class="btn-icon btn-edit" @click="$emit('edit', room)" title="Edit Classroom">
              ✏️ Edit
            </button>
            <button class="btn-icon btn-delete" @click="room.id && $emit('delete', room.id)" title="Delete Classroom">
              🗑️ Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Classroom } from '../services'

defineProps<{
  classrooms: Classroom[]
}>()

defineEmits<{
  (e: 'edit', classroom: Classroom): void
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

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-lab-yes {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge-lab-no {
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.3);
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
