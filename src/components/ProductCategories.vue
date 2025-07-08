<template>
  <div class="product-categories">
    <h2 v-if="category">{{ categoryName }} Products</h2>
    <h2 v-else>All Products</h2>
    
    <div class="filter-section">
      <input v-model="searchQuery" placeholder="Cari produk..." />
      <select v-model="sortBy">
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>
    </div>

    <div v-if="productStore.isLoading">Loading products...</div>
    <div v-else-if="filteredProducts.length > 0" class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product"
        @addToCart="cartStore.addToCart"
      />
    </div>
    <div v-else class="empty-products">
      <p>No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import ProductCard from '@/components/ProductCard.vue'

const props = defineProps({
  category: {
    type: String,
    default: ''
  }
})

const productStore = useProductStore()
const cartStore = useCartStore()
const searchQuery = ref('')
const sortBy = ref('name')

const categoryName = computed(() => {
  switch(props.category) {
    case 'mod': return 'Mod/AIO'
    case 'pod': return 'Pod'
    case 'liquid': return 'Liquid'
    default: return ''
  }
})

const filteredProducts = computed(() => {
  let products = props.category 
    ? productStore.getProductsByCategory(props.category)
    : productStore.products

  // Filter by search query
  if (searchQuery.value) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Sort products
  if (sortBy.value === 'name') {
    return [...products].sort((a, b) => a.name.localeCompare(b.name))
  } else {
    return [...products].sort((a, b) => a.price - b.price)
  }
})

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})
</script>

<style scoped>
.product-categories {
  padding: 1rem;
}

.filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

input, select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.empty-products {
  text-align: center;
  padding: 2rem;
  color: #666;
}
</style>