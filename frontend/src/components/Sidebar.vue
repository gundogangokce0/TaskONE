<template>
  <aside class="sidebar">
    <!-- Brand Logo / Title -->
    <div class="sidebar-brand">
      <div class="brand-icon">🎓</div>
      <div class="brand-text">
        <h1>Timetable</h1>
        <span>Optimization Portal</span>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">MANAGEMENT</div>
      
      <router-link to="/teachers" class="nav-item">
        <span class="nav-icon">👨‍🏫</span>
        <span class="nav-label">Teachers</span>
      </router-link>

      <router-link to="/courses" class="nav-item">
        <span class="nav-icon">📚</span>
        <span class="nav-label">Courses</span>
      </router-link>

      <router-link to="/classrooms" class="nav-item">
        <span class="nav-icon">🏫</span>
        <span class="nav-label">Classrooms</span>
      </router-link>

      <router-link to="/school-classes" class="nav-item">
        <span class="nav-icon">👥</span>
        <span class="nav-label">School Classes</span>
      </router-link>

      <router-link to="/time-slots" class="nav-item">
        <span class="nav-icon">⏰</span>
        <span class="nav-label">Time Slots</span>
      </router-link>
    </nav>

    <!-- User Profile & Logout at Bottom -->
    <div class="sidebar-footer">
      <div class="user-card">
        <div class="user-avatar">{{ userInitial }}</div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">Administrator</span>
        </div>
      </div>
      <button class="btn-logout" @click="handleLogout" title="Logout">
        <span>🚪 Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('Admin User')

onMounted(() => {
  const userInfo = localStorage.getItem('user_info')
  if (userInfo) {
    try {
      const user = JSON.parse(userInfo)
      userName.value = user.username || user.first_name || 'Admin User'
    } catch {
      userName.value = 'Admin User'
    }
  }
})

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase()
})

const handleLogout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_info')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: rgba(15, 23, 42, 0.95);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  backdrop-filter: blur(16px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-icon {
  font-size: 1.8rem;
  background: rgba(99, 102, 241, 0.15);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.brand-text h1 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  line-height: 1.2;
}

.brand-text span {
  font-size: 0.75rem;
  color: #94a3b8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.nav-section-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #64748b;
  letter-spacing: 0.1em;
  padding: 8px 12px 4px 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.router-link-active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(79, 70, 229, 0.3) 100%);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #818cf8;
  font-weight: 600;
}

.nav-icon {
  font-size: 1.1rem;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.6);
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.user-role {
  font-size: 0.72rem;
  color: #94a3b8;
}

.btn-logout {
  width: 100%;
  padding: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fff;
}
</style>
