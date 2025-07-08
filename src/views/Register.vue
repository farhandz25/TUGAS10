<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Buat Akun Baru</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p class="message">Sudah punya akun? <router-link to="/login">Login di sini</router-link></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const username = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleRegister = () => {
  const newUser = {
    username: username.value,
    email: email.value,
    password: password.value,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  authStore.register(newUser);
};
</script>

<style scoped>
.register-container { max-width: 400px; margin: 40px auto; padding: 20px; }
.register-card { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
h2 { margin-bottom: 20px; color: #2c3e50; text-align: center; }
form { display: flex; flex-direction: column; }
input { margin-bottom: 15px; padding: 12px; border-radius: 6px; border: 1px solid #ccc; font-size: 1rem; }
button { padding: 12px; background-color: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; transition: background-color 0.2s; }
button:hover { background-color: #34495e; }
.message { margin-top: 15px; font-size: 14px; text-align: center; }
</style>