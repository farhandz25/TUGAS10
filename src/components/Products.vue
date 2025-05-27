<template>
  <div class="products-page">
    <h1>🛒 Vape Products</h1>

    <!-- Search & Filter -->
    <div class="filter-section">
      <input v-model="searchQuery" placeholder="Cari produk..." />
      <select v-model="selectedCategory">
        <option value="">Semua Kategori</option>
        <option value="mod">Mod/AIO</option>
        <option value="pod">Pod</option>
        <option value="liquid">Liquid</option>
      </select>
    </div>

    <!-- Products Grid -->
    <div class="products-grid">
      <div class="product-card" v-for="product in filteredProducts" :key="product.id">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <p class="price">Rp{{ product.price.toLocaleString() }}</p>
        <p v-if="product.stock > 0">Stok: {{ product.stock }}</p>
        <p v-else class="out-of-stock">Stok Habis</p>
        <button @click="addToCart(product)" :disabled="product.stock === 0">Tambah ke Keranjang</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      searchQuery: "",
      selectedCategory: "",
      products: [
        {
          id: 1,
          name: "Hexohm V3",
          description: "Warna Purple, Mod only dan free liquid pembelian Hexohm ini",
          price: 3500000,
          stock: 8,
          category: "mod",
          image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/108/MTA-116948619/hexohm_md-_mod_hexohm_v3_anodized_full02_kc0vkbuo.jpg"
        },
        {
          id: 2,
          name: "Pod X Signature FOOM",
          description: "Warna Green Satin, FULL SET dan free liquid didalamnya",
          price: 180000,
          stock: 15,
          category: "pod",
          image: "https://foom.id/cdn/shop/files/pod-x-signature-green-satin-or-liquid-vape-terenak-dan-pods-vape-terbaik-dari-foom-36317.png?v=1746949258"
        },
        {
          id: 3,
          name: "Liquid MAKNA V2 60ml",
          description: "Liquid rasa Taro Milk Cheese yang lagi populer dipakai orang-orang!!",
          price: 155000,
          stock: 30,
          category: "liquid",
          image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/90/MTA-180524401/brd-60517_liquid-vape-makna-v2-taro-milk-cheese-60ml-by-union-labs_full04-ae018544.jpg"
        },
        {
          id: 4,
          name: "dotAIO V2",
          description: "Warna Black, Device only dan AIO ini lagi ramai dipakai orang-orang",
          price: 1699999,
          stock: 5,
          category: "mod",
          image: "https://dotmod.com/cdn/shop/files/Black_B.png?crop=center&height=1200&v=1729195543&width=1200"
        },
        {
          id: 5,
          name: "Liquid Bakpia Kukus 60ml",
          description: "Liquid rasa bakpia kukus, berasa makan bakpianya beneran",
          price: 155000,
          stock: 20,
          category: "liquid",
          image: "https://d1d8o7q9jg8pjk.cloudfront.net/p/lg_6725de26783cd.png"
        },
        {
          id: 6,
          name: "Liquid THE ORAMA JUICE 60ml",
          description: "Liquid rasa srikaya dan ini yang banyak beli orang",
          price: 150000,
          stock: 47,
          category: "liquid",
          image: "https://vapeboss.co.id/assets/Product/20240716/a25d2a39-c063-4b26-9ede-6407c1c41c6a__FillWzM1NSwzNTVd.jpg"
        },
      ]
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(p => {
        const matchesCategory = this.selectedCategory === "" || p.category === this.selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product); // Emit event ke parent (misalnya App.vue)
      alert(`✅ ${product.name} ditambahkan ke keranjang!`);
    }
  }
};
</script>

<style scoped>
.products-page {
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

input, select {
  padding: 0.5rem;
  font-size: 1rem;
}

.products-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: flex-start;
}

.product-card {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  width: 220px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  text-align: center;
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.price {
  color: #27ae60;
  font-weight: bold;
  margin: 0.5rem 0;
}

.out-of-stock {
  color: red;
  font-weight: bold;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}
</style>
