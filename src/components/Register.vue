<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Create an Account</h2>
      <form @submit.prevent="registerUser">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p class="message">Already have an account? <router-link to="/login">Login here</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    registerUser() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Cek jika username sudah dipakai
      const exists = users.find(user => user.username === this.username);
      if (exists) {
        alert("Username sudah digunakan. Silakan pilih yang lain.");
        return;
      }

      const newUser = {
        username: this.username,
        password: this.password,
        email: this.username + "@vapemail.com",
        createdAt: new Date().toISOString().slice(0, 10)
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Akun berhasil dibuat!");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
}
.register-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #34495e;
}
.message {
  margin-top: 15px;
  font-size: 14px;
}
</style>
