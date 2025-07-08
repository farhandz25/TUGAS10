<template>
  <div class="orders-page">
    <h2>📦 Riwayat Pesanan Saya</h2>

    <div v-if="isLoading" class="loading">Memuat pesanan...</div>
    <div v-else-if="orders.length > 0">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
            <h3>Pesanan #{{ order.id }}</h3>
            <span>{{ order.date }}</span>
        </div>
        <p :class="['status', order.status.toLowerCase()]"><strong>Status:</strong> {{ order.status }}</p>

        <ul class="item-list">
          <li v-for="item in order.items" :key="item.id">
            {{ item.name }} x {{ item.quantity }}
          </li>
        </ul>
        <p class="total"><strong>Total:</strong> Rp{{ order.total.toLocaleString() }}</p>
      </div>
    </div>
    <div v-else class="empty-orders">
      <p>Anda belum memiliki riwayat pesanan.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const orders = ref([]);
const isLoading = ref(true);
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      const response = await axios.get(`http://localhost:3000/orders?userId=${authStore.currentUser.id}`);
      // Urutkan dari yang terbaru
      orders.value = response.data.sort((a, b) => b.id - a.id);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    } finally {
      isLoading.value = false;
    }
  }
});
</script>

<style scoped>
.orders-page { max-width: 900px; margin: 2rem auto; padding: 2rem; }
h2 { text-align: center; margin-bottom: 2rem; }
.order-card { border: 1px solid #e0e0e0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; background: #fff; box-shadow: 0 4px 8px rgba(0,0,0,0.05); }
.order-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0; padding-bottom: 1rem; margin-bottom: 1rem; }
.order-header h3 { margin: 0; }
.order-header span { font-size: 0.9rem; color: #777; }
.status { padding: 5px 10px; border-radius: 15px; color: white; display: inline-block; font-size: 0.9rem; margin-bottom: 1rem; }
.status.diproses { background-color: #3498db; }
.status.dibatalkan { background-color: #e74c3c; }
.item-list { list-style: none; padding: 0; }
.item-list li { padding: 5px 0; }
.total { text-align: right; font-size: 1.2rem; margin-top: 1rem; }
.loading, .empty-orders { text-align: center; color: #888; font-size: 1.2rem; padding: 3rem; }
</style>