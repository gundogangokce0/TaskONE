<template>
  <div class="app-layout">
    <!-- Fixed Left Navigation Sidebar -->
    <Sidebar />

    <!-- Main Dynamic Content Area -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: #0f172a;
  color: #f8fafc;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.main-content {
  margin-left: 260px;
  flex: 1;
  min-height: 100vh;
  box-sizing: border-box;
  background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
}
</style>
