<template>
  <div id="app">
    <header class="app-header">
      <h1 class="logo">VapeStore</h1>
      <nav class="navigation">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart ({{ cartCount }})</router-link>
        <router-link to="/orders">Orders</router-link>
        <router-link to="/account">Account</router-link>
        <router-link to="/login">Login</router-link>
      </nav>
    </header>

    <main>
      <router-view @add-to-cart="handleAddToCart"></router-view>
    </main>

    <footer class="app-footer">
      <p>&copy; 2025 VapeStore. All rights reserved.</p>
      <p>
        Follow us:
        <a href="#">Instagram</a> |
        <a href="#">Facebook</a> |
        <a href="#">Twitter</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      cartCount: 0,
    };
  },
  created() {
    this.updateCartCount();
    window.addEventListener("storage", this.updateCartCount);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateCartCount);
  },
  methods: {
    handleAddToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.updateCartCount();
    },
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "Segoe UI", Roboto, Helvetica, sans-serif;
  color: #2c3e50;
  background-color: #f7f9fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.logo {
  font-size: 1.8em;
  font-weight: bold;
  background: linear-gradient(to right, #00d1b2, #1abc9c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.navigation a {
  color: #ddd;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navigation a.router-link-exact-active {
  color: #00c6ff;
  font-weight: bold;
}

main {
  flex: 1;
  padding: 2rem;
}

.app-footer {
  background-color: #1a1a1a;
  color: #ccc;
  text-align: center;
  padding: 1.5rem 1rem;
  font-size: 14px;
}

.app-footer a {
  color: #00c6ff;
  text-decoration: none;
}

.app-footer a:hover {
  text-decoration: underline;
}
</style>
