import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from './cartStore'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('should initialize with empty items if no localStorage', () => {
    const cartStore = useCartStore()
    expect(cartStore.items).toEqual([])
    expect(cartStore.cartCount).toBe(0)
    expect(cartStore.totalPrice).toBe(0)
  })

  it('should initialize with items from localStorage', () => {
    const mockItems = [
      { id: 1, name: 'Product 1', price: 100000, quantity: 2 },
      { id: 2, name: 'Product 2', price: 150000, quantity: 1 }
    ]
    localStorage.setItem('cart', JSON.stringify(mockItems))
    
    const cartStore = useCartStore()
    expect(cartStore.items).toEqual(mockItems)
    expect(cartStore.cartCount).toBe(3)
    expect(cartStore.totalPrice).toBe(350000)
  })

  describe('addToCart', () => {
    it('should add new product to cart', () => {
      const cartStore = useCartStore()
      const product = { id: 1, name: 'New Product', price: 200000 }
      
      cartStore.addToCart(product)
      
      expect(cartStore.items).toEqual([{ ...product, quantity: 1 }])
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(cartStore.items))
      expect(cartStore.cartCount).toBe(1)
      expect(cartStore.totalPrice).toBe(200000)
    })

    it('should increment quantity if product already in cart', () => {
      const initialItems = [{ id: 1, name: 'Existing Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      const product = { id: 1, name: 'Existing Product', price: 100000 }
      
      cartStore.addToCart(product)
      
      expect(cartStore.items).toEqual([{ ...product, quantity: 2 }])
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(cartStore.items))
      expect(cartStore.cartCount).toBe(2)
      expect(cartStore.totalPrice).toBe(200000)
    })
  })

  describe('increaseQty', () => {
    it('should increase quantity of existing item', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.increaseQty(initialItems[0])
      
      expect(cartStore.items[0].quantity).toBe(2)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(cartStore.items))
      expect(cartStore.cartCount).toBe(2)
      expect(cartStore.totalPrice).toBe(200000)
    })

    it('should do nothing if item not in cart', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.increaseQty({ id: 2, name: 'Other Product', price: 150000 })
      
      expect(cartStore.items).toEqual(initialItems)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(initialItems))
    })
  })

  describe('decreaseQty', () => {
    it('should decrease quantity of existing item', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 2 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.decreaseQty(initialItems[0])
      
      expect(cartStore.items[0].quantity).toBe(1)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(cartStore.items))
      expect(cartStore.cartCount).toBe(1)
      expect(cartStore.totalPrice).toBe(100000)
    })

    it('should not decrease below 1', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.decreaseQty(initialItems[0])
      
      expect(cartStore.items[0].quantity).toBe(1)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(initialItems))
    })

    it('should do nothing if item not in cart', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.decreaseQty({ id: 2, name: 'Other Product', price: 150000 })
      
      expect(cartStore.items).toEqual(initialItems)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(initialItems))
    })
  })

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const initialItems = [
        { id: 1, name: 'Product 1', price: 100000, quantity: 1 },
        { id: 2, name: 'Product 2', price: 150000, quantity: 2 }
      ]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.removeItem(initialItems[0])
      
      expect(cartStore.items).toEqual([initialItems[1]])
      expect(localStorage.getItem('cart')).toBe(JSON.stringify([initialItems[1]]))
      expect(cartStore.cartCount).toBe(2)
      expect(cartStore.totalPrice).toBe(300000)
    })

    it('should do nothing if item not in cart', () => {
      const initialItems = [{ id: 1, name: 'Product', price: 100000, quantity: 1 }]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.removeItem({ id: 2, name: 'Other Product', price: 150000 })
      
      expect(cartStore.items).toEqual(initialItems)
      expect(localStorage.getItem('cart')).toBe(JSON.stringify(initialItems))
    })
  })

  describe('clearCart', () => {
    it('should empty the cart', () => {
      const initialItems = [
        { id: 1, name: 'Product 1', price: 100000, quantity: 1 },
        { id: 2, name: 'Product 2', price: 150000, quantity: 2 }
      ]
      localStorage.setItem('cart', JSON.stringify(initialItems))
      
      const cartStore = useCartStore()
      cartStore.clearCart()
      
      expect(cartStore.items).toEqual([])
      expect(localStorage.getItem('cart')).toBe(JSON.stringify([]))
      expect(cartStore.cartCount).toBe(0)
      expect(cartStore.totalPrice).toBe(0)
    })
  })

  describe('loadFromLocalStorage', () => {
    it('should load items from localStorage', () => {
      const mockItems = [
        { id: 1, name: 'Product 1', price: 100000, quantity: 2 },
        { id: 2, name: 'Product 2', price: 150000, quantity: 1 }
      ]
      localStorage.setItem('cart', JSON.stringify(mockItems))
      
      const cartStore = useCartStore()
      // Simulate empty store first
      cartStore.items = []
      cartStore.loadFromLocalStorage()
      
      expect(cartStore.items).toEqual(mockItems)
    })

    it('should handle invalid localStorage data', () => {
      localStorage.setItem('cart', 'invalid json')
      
      const cartStore = useCartStore()
      cartStore.loadFromLocalStorage()
      
      expect(cartStore.items).toEqual([])
    })
  })
})