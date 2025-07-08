<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Loading...' : 'Login' }}
      </button>
      </form>
    <p>Belum punya akun? <router-link to="/register">Daftar di sini</router-link>.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  // authStore.login mengharapkan sebuah objek sebagai argumen
  await authStore.login({ 
    username: username.value, 
    password: password.value 
  });
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 50px auto; text-align: left; }
input { display: block; width: 100%; padding: 10px; margin: 10px 0; }
button { padding: 10px 20px; width: 100%; background-color: #2c3e50; color: white; border: none; cursor: pointer; }
button:disabled { background-color: #95a5a6; cursor: not-allowed; }
</style>