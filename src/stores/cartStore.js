import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    cartCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
    addToCart(product) {
      const existing = this.items.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveToLocalStorage();
      alert(`✅ ${product.name} ditambahkan ke keranjang!`);
    },
    increaseQty(item) {
      const target = this.items.find((p) => p.id === item.id);
      if (target) {
        target.quantity++;
        this.saveToLocalStorage();
      }
    },
    decreaseQty(item) {
      const target = this.items.find((p) => p.id === item.id);
      if (target && target.quantity > 1) {
        target.quantity--;
        this.saveToLocalStorage();
      }
    },
    removeItem(item) {
      this.items = this.items.filter((p) => p.id !== item.id);
      this.saveToLocalStorage();
    },
    clearCart() {
        this.items = [];
        this.saveToLocalStorage();
    }
  },
});