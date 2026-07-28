<template>
  <div class="login-wrapper">
    <div class="background-glow glow-1"></div>
    <div class="background-glow glow-2"></div>

    <div class="login-container">
      <div class="login-header">
        <div class="brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h2>Welcome Back</h2>
        <p>Optimization Timetable Portal</p>
      </div>

      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '../components/LoginForm.vue'
</script>
