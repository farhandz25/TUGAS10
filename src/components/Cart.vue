<template>
  <div class="cart-page">
    <h2>🛒 Keranjang Belanja</h2>

    <div v-if="cartItems.length > 0">
      <table>
        <thead>
          <tr>
            <th>Produk</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Total</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>Rp{{ item.price.toLocaleString() }}</td>
            <td>
              <button @click="decreaseQty(item)">-</button>
              {{ item.quantity }}
              <button @click="increaseQty(item)">+</button>
            </td>
            <td>Rp{{ (item.price * item.quantity).toLocaleString() }}</td>
            <td><button @click="removeItem(item)">Hapus</button></td>
          </tr>
        </tbody>
      </table>

      <div class="cart-summary">
        <h3>Total Belanja: Rp{{ totalPrice.toLocaleString() }}</h3>
        <button @click="checkout">Checkout</button>
      </div>
    </div>
    <div v-else>
      <p>Keranjang masih kosong 🛍️</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  },
  methods: {
    increaseQty(item) {
      item.quantity++;
      this.saveCart();
    },
    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveCart();
      }
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter(p => p.id !== item.id);
      this.saveCart();
    },
    checkout() {
      // Simpan order ke localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const newOrder = {
        id: Date.now(),
        items: this.cartItems,
        total: this.totalPrice,
        date: new Date().toLocaleString(),
        status: "Diproses"
      };
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Kosongkan keranjang
      this.cartItems = [];
      this.saveCart();

      this.$router.push('/orders');
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }
  }
};
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
}

button {
  background-color: #42b983;
  border: none;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  text-align: right;
  font-size: 1.2rem;
}
</style>
