<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero">
      <h1>Welcome to VapeStore YOKAI</h1>
      <p>DISINI SUDAH PASTI LENGKAP DAN MURAH!!!!</p>
      <router-link to="/products" class="shop-now-btn">Shop Now</router-link>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2>🔥 Produk Recommended</h2>
      <div class="product-grid">
        <div class="product-card" v-for="(product, index) in featuredProducts" :key="index">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="price">Rp{{ product.price.toLocaleString() }}</p>
        </div>
      </div>
    </section>

    <!-- Promo Section -->
    <section class="promo-banner">
      <h2>⚡ Flash Sale!</h2>
      <p>Dapatkan diskon hingga 50% dalam bulan ini!</p>
      <p>Jangan sampai terlewatkan yaaa</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      featuredProducts: [
        {
          name: 'dotAIO V2',
          description: 'Warna Black, Device only dan AIO ini lagi ramai dipakai orang-orang',
          price: 1699999,
          image: 'https://dotmod.com/cdn/shop/files/Black_B.png?crop=center&height=1200&v=1729195543&width=1200'
        },
        {
          name: 'Mod Hexohm V3',
          description: 'Warna Purple, Mod only dan free liquid pembelian Hexohm ini',
          price: 3500000,
          image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/108/MTA-116948619/hexohm_md-_mod_hexohm_v3_anodized_full02_kc0vkbuo.jpg'
        },
        {
          name: 'Pod X Signature FOOM',
          description: 'Warna Green Satin, FULL SET dan free liquid didalamnya',
          price: 180000,
          image: 'https://foom.id/cdn/shop/files/pod-x-signature-green-satin-or-liquid-vape-terenak-dan-pods-vape-terbaik-dari-foom-36317.png?v=1746949258'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-container {
  font-family: 'Segoe UI', sans-serif;
}

.hero {
  background: url('https://images.unsplash.com/photo-1574434201071-060eae50e4a2?auto=format&fit=crop&w=1200&q=80') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.shop-now-btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
}

.featured-products {
  padding: 2rem;
  text-align: center;
}

.product-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.product-card {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.price {
  color: #2ecc71;
  font-weight: bold;
  margin-top: 0.5rem;
}

.promo-banner {
  background: #ff7675;
  color: white;
  padding: 1.5rem;
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
  border-radius: 10px;
}
</style>
