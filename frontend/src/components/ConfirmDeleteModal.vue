<template>
  <!-- 1. Teleport to Body: Pop-up penceresinin sayfanın en üst katmanında (z-index) görünmesini sağlar -->
  <Teleport to="body">
    <!-- 2. Modal Overlay: Arka planı karartan ve blur yapan katman -->
    <div v-if="isOpen" class="modal-overlay" @click.self="$emit('cancel')">
      <!-- 3. Modal Card Container: Kırmızı uyarılı diyalog kutusu -->
      <div class="modal-card">
        
        <!-- Modal Header: Uyarı Başlığı ve Kapatma Butonu -->
        <div class="modal-header">
          <div class="header-title">
            <span class="header-icon">⚠️</span>
            <h3>{{ title || t.delete }}</h3>
          </div>
          <button class="btn-close" @click="$emit('cancel')" :title="t.close">✕</button>
        </div>

        <!-- Modal Body: Silme Mesajı Metni -->
        <div class="modal-body">
          <div class="warning-box">
            <p class="warning-message">{{ message }}</p>
          </div>
        </div>

        <!-- Modal Footer: İptal ve Silmeyi Onayla Butonları -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
            {{ cancelText || t.cancel }}
          </button>
          <button type="button" class="btn btn-danger" @click="$emit('confirm')">
            🗑️ {{ confirmText || t.delete }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { t } from '../i18n'

// Props (Dışarıdan Gelen Parametreler): Sayfaların bu ortak diyaloğa göndereceği özelleştirilebilir veriler
defineProps<{
  isOpen?: boolean           // Diyalog açık mı kapalı mı?
  title?: string             // Diyalog Başlığı (Örn: "Öğretmen Silme Onayı")
  message?: string           // Silme Uyarı Mesajı (Örn: "Ahmet Yılmaz isimli öğretmeni silmek istediğinize emin misiniz?")
  confirmText?: string       // Silme Buton Yazısı (Örn: "EVET, SİL")
  cancelText?: string        // İptal Buton Yazısı (Örn: "İPTAL")
}>()

// Emits (Dışarıya Gönderilen Olaylar): Butonlara basıldığında ana sayfaya verilen haberler
defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 20px;
  box-sizing: border-box;
  animation: fadeIn 0.2s ease-out;
}

.modal-card {
  background: rgba(30, 41, 59, 0.98);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(239, 68, 68, 0.25);
  overflow: hidden;
  animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(239, 68, 68, 0.1);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 1.4rem;
}

.header-title h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fca5a5;
}

.btn-close {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #94a3b8;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #fff;
}

.modal-body {
  padding: 24px;
}

.warning-box {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 18px;
}

.warning-message {
  margin: 0;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(15, 23, 42, 0.6);
}

.btn {
  padding: 10px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.btn-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(239, 68, 68, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94a3b8;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
