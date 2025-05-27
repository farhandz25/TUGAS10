<template>
  <div class="account-container">
    <div class="account-card">
      <div class="account-header">
        <div class="avatar-wrapper">
          <img class="avatar" :src="profileImage" alt="User Avatar" />
          <label class="custom-upload">
            Ganti Foto
            <input type="file" @change="onImageChange" accept="image/*" class="hidden-upload" />
          </label>
        </div>
        <div>
          <h2>My Account</h2>
          <p class="member-since">Member Since: {{ user.createdAt || "Unknown" }}</p>
        </div>
      </div>

      <div v-if="user" class="user-info">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email || "Not provided" }}</p>

        <div class="quick-stats">
          <div class="stat-card">
            <h4>Total Orders</h4>
            <p>{{ orders.length }}</p>
          </div>
          <div class="stat-card">
            <h4>Last Order</h4>
            <p>{{ orders[0]?.status || "N/A" }}</p>
          </div>
        </div>

        <div class="quick-links">
          <router-link to="/orders">View Orders</router-link>
          <router-link to="/cart">View Cart</router-link>
          <router-link to="/products">Continue Shopping</router-link>
        </div>

        <h3>Order History</h3>
        <ul class="order-history" v-if="orders.length">
          <li v-for="order in orders" :key="order.id">
            <span>Order #{{ order.id }}</span>
            <span>{{ order.date }}</span>
            <span>Status: <strong>{{ order.status }}</strong></span>
          </li>
        </ul>
        <p v-else>No orders found.</p>

        <button @click="logout" class="logout-button">Logout</button>
      </div>

      <div v-else>
        <p>Please <router-link to="/login">login</router-link> to view your account.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      user: null,
      orders: [],
      profileImage: null
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("loggedInUser"));
    this.orders = JSON.parse(localStorage.getItem("orders") || "[]");
    this.profileImage =
      localStorage.getItem("profileImage") || "https://via.placeholder.com/80";
  },
  methods: {
    logout() {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("profileImage");
      this.$router.push("/login");
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target.result;
        localStorage.setItem("profileImage", this.profileImage);
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.account-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}
.account-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}
.account-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}
.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.hidden-upload {
  display: none;
}
.custom-upload {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 14px;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;
}
.custom-upload:hover {
  background-color: #2980b9;
}
.member-since {
  color: #888;
  font-size: 14px;
}
.user-info p {
  margin: 8px 0;
}
.quick-stats {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}
.stat-card {
  flex: 1;
  background: #f0f3f5;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}
.stat-card h4 {
  margin-bottom: 10px;
  color: #333;
}
.quick-links {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}
.quick-links a {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}
.quick-links a:hover {
  background-color: #2980b9;
}
.order-history {
  list-style: none;
  padding: 0;
  margin: 0;
}
.order-history li {
  display: flex;
  justify-content: space-between;
  background: #fafafa;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.logout-button {
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 25px;
  font-size: 15px;
}
.logout-button:hover {
  background: #c0392b;
}
</style>
