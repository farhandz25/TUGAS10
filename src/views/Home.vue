<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Premium Vape Products</h1>
        <p class="hero-subtitle">Temukan koleksi terbaik untuk pengalaman vaping terbaik</p>
        <router-link to="/products" class="hero-button">Jelajahi Produk</router-link>
      </div>
      <div class="hero-image">
        <img src="@/assets/images/hero-vape.png" alt="Vape Products" />
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="feature-card">
        <i class="fas fa-shipping-fast"></i>
        <h3>Gratis Ongkir</h3>
        <p>Untuk pembelian di atas Rp500.000</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-shield-alt"></i>
        <h3>Garansi Resmi</h3>
        <p>Produk 100% original</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-headset"></i>
        <h3>Customer Service</h3>
        <p>Bantuan 24/7</p>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <div class="section-header">
        <h2>Produk Unggulan</h2>
        <router-link to="/products" class="view-all">Lihat Semua</router-link>
      </div>
      <div class="products-grid">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product"
          @addToCart="handleAddToCart"
          @quickView="handleQuickView"
        />
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="promo-banner">
      <div class="promo-content">
        <h2>Flash Sale Akhir Tahun!</h2>
        <p>Diskon hingga 50% untuk produk pilihan</p>
        <div class="countdown-timer">
          <div class="timer-box">
            <span>{{ days }}</span>
            <small>Hari</small>
          </div>
          <div class="timer-box">
            <span>{{ hours }}</span>
            <small>Jam</small>
          </div>
          <div class="timer-box">
            <span>{{ minutes }}</span>
            <small>Menit</small>
          </div>
          <div class="timer-box">
            <span>{{ seconds }}</span>
            <small>Detik</small>
          </div>
        </div>
        <router-link to="/products?discount=true" class="promo-button">Beli Sekarang</router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const categories = [
  { id: 'mod', name: 'Mod/AIO', image: '@/assets/images/mod-category.jpg' },
  { id: 'pod', name: 'Pod System', image: '@/assets/images/pod-category.jpg' },
  { id: 'liquid', name: 'E-Liquid', image: '@/assets/images/liquid-category.jpg' }
]

const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4)
})

const handleAddToCart = (product) => {
  // Handle add to cart logic
}

const handleQuickView = (product) => {
  // Handle quick view logic
}

const updateCountdown = () => {
  const now = new Date()
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59)
  const diff = endOfYear - now
  
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
  
  setInterval(updateCountdown, 1000)
  updateCountdown()
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 40px;
}

.hero-content {
  flex: 1;
  max-width: 50%;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #4a5568;
  margin-bottom: 25px;
}

.hero-button {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 12px 25px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.hero-button:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.hero-image {
  flex: 1;
  max-width: 45%;
}

.hero-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-card p {
  color: #718096;
  font-size: 0.9rem;
}

/* Featured Products */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #2c3e50;
}

.view-all {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #2980b9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

/* Promo Banner */
.promo-banner {
  background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
  border-radius: 16px;
  padding: 40px;
  margin-bottom: 40px;
  color: white;
  text-align: center;
}

.promo-content h2 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.promo-content p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.countdown-timer {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.timer-box {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px 15px;
  min-width: 70px;
}

.timer-box span {
  font-size: 1.8rem;
  font-weight: 700;
  display: block;
}

.timer-box small {
  font-size: 0.8rem;
  opacity: 0.8;
}

.promo-button {
  display: inline-block;
  background: white;
  color: #ff758c;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.promo-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Categories Section */
.categories-section {
  margin-bottom: 40px;
}

.categories-section h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 25px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.category-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  color: white;
}

.category-overlay h3 {
  margin: 0;
  font-size: 1.4rem;
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
  
  .hero-content {
    max-width: 100%;
    margin-bottom: 20px;
  }
  
  .hero-image {
    max-width: 100%;
  }
  
  .features-section {
    grid-template-columns: 1fr;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>