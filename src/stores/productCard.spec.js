import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100000,
      stock: 10,
      image: 'test.jpg'
    }

    const wrapper = mount(ProductCard, {
      props: { product }
    })

    expect(wrapper.find('h3').text()).toBe(product.name)
    expect(wrapper.find('.description').text()).toBe(product.description)
    expect(wrapper.find('.price').text()).toBe(`Rp${product.price.toLocaleString()}`)
    expect(wrapper.find('p').text()).toContain(`Stok: ${product.stock}`)
    expect(wrapper.find('button').text()).toBe('Tambah ke Keranjang')
  })

  it('displays out of stock message when stock is 0', () => {
    const product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100000,
      stock: 0,
      image: 'test.jpg'
    }

    const wrapper = mount(ProductCard, {
      props: { product }
    })

    expect(wrapper.find('.out-of-stock').text()).toBe('Stok Habis')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('emits addToCart event when button is clicked', async () => {
    const product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100000,
      stock: 10,
      image: 'test.jpg'
    }

    const wrapper = mount(ProductCard, {
      props: { product }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('addToCart')).toBeTruthy()
    expect(wrapper.emitted('addToCart')[0]).toEqual([product])
  })

  it('does not emit addToCart when out of stock', async () => {
    const product = {
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100000,
      stock: 0,
      image: 'test.jpg'
    }

    const wrapper = mount(ProductCard, {
      props: { product }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('addToCart')).toBeFalsy()
  })
})