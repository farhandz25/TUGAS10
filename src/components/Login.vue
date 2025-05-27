<template>
  <div class="auth-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link>.</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => u.username === this.username && u.password === this.password);

      if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        this.$router.push("/account");
      } else {
        this.error = "Invalid username or password";
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  text-align: left;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px 20px;
  width: 100%;
  background-color: #2c3e50;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
