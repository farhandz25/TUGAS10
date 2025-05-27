import { createRouter, createWebHistory } from 'vue-router'

// Import semua komponen halaman
import Home from '../components/Home.vue'
import Products from '../components/Products.vue'
import Cart from '../components/Cart.vue'
import Orders from '../components/Orders.vue'
import Account from '../components/Account.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue' // ✅ Tambahkan ini

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/account', name: 'Account', component: Account },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register }, // ✅ Tambahkan ini
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
