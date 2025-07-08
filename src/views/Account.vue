<template>
  <div class="account-container">
    <div class="account-card" v-if="authStore.isAuthenticated">
      <div class="account-header">
        <h2>Akun Saya</h2>
      </div>
      <div class="user-info">
        <p><strong>Username:</strong> {{ authStore.currentUser.username }}</p>
        <p><strong>Email:</strong> {{ authStore.currentUser.email || "N/A" }}</p>
        <p class="member-since">Member Sejak: {{ authStore.currentUser.createdAt || "Tidak diketahui" }}</p>
      </div>
      <div class="quick-links">
        <router-link to="/orders">Lihat Riwayat Pesanan</router-link>
        <router-link to="/products">Lanjut Belanja</router-link>
      </div>
      <button @click="authStore.logout()" class="logout-button">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';
const authStore = useAuthStore();
</script>

<style scoped>
/* Scoped Styles for Account.vue */
.account-container { max-width: 700px; margin: 2rem auto; padding: 2rem; }
.account-card { background: #ffffff; border-radius: 12px; padding: 2rem; box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
.account-header h2 { font-size: 2rem; color: #2c3e50; margin: 0; }
.user-info { margin: 1.5rem 0; border-top: 1px solid #eee; padding-top: 1.5rem; }
.user-info p { margin: 0.5rem 0; font-size: 1rem; }
.member-since { color: #7f8c8d; font-size: 0.9rem; }
.quick-links { display: flex; gap: 1rem; flex-wrap: wrap; margin: 1.5rem 0; }
.quick-links a { background-color: #3498db; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 8px; transition: background-color 0.3s; }
.quick-links a:hover { background-color: #2980b9; }
.logout-button { background: #e74c3c; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-size: 1rem; transition: background-color 0.3s; }
.logout-button:hover { background: #c0392b; }
</style>