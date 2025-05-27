<template>
  <div class="orders-page">
    <h2>📦 Riwayat Pesanan</h2>

    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <h3>Pesanan ID: {{ order.id }}</h3>
        <p><strong>Tanggal:</strong> {{ order.date }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>

        <ul>
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x {{ item.quantity }} = Rp{{ (item.price * item.quantity).toLocaleString() }}
          </li>
        </ul>
        <p><strong>Total:</strong> Rp{{ order.total.toLocaleString() }}</p>
        <button @click="cancelOrder(order.id)" v-if="order.status === 'Diproses'">Batalkan</button>
      </div>
    </div>
    <div v-else>
      <p>Belum ada pesanan</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orders",
  data() {
    return {
      orders: JSON.parse(localStorage.getItem("orders") || "[]")
    };
  },
  methods: {
    cancelOrder(orderId) {
      const order = this.orders.find(o => o.id === orderId);
      if (order && order.status === "Diproses") {
        order.status = "Dibatalkan";
        this.saveOrders();
      }
    },
    saveOrders() {
      localStorage.setItem("orders", JSON.stringify(this.orders));
    }
  }
};
</script>

<style scoped>
.orders-page {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}
.order-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: #f9f9f9;
}
.order-card h3 {
  margin-bottom: 0.5rem;
}
.order-card ul {
  padding-left: 1rem;
  margin: 0.5rem 0;
}
.order-card button {
  margin-top: 0.5rem;
  background-color: #e67e22;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.order-card button:hover {
  background-color: #d35400;
}
</style>
