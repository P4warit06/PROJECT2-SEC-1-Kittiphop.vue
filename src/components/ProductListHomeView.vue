<template>
    <div class="product-list">
      <!-- แสดงหัวข้อ -->
      <h2 v-if="title" class="product-list__title">{{ title }}</h2>
  
      <!-- แสดง Loading State -->
      <div v-if="loading" class="loading">
        <p>กำลังโหลดสินค้า...</p>
      </div>
  
      <!-- แสดงข้อความเมื่อไม่มีสินค้า -->
      <div v-else-if="products.length === 0" class="empty-message">
        <p>ไม่พบสินค้า</p>
      </div>
  
      <!-- แสดงรายการสินค้า -->
      <div v-else class="product-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          @click="$emit('select-product', product)"
        >
          <!-- รูปสินค้า (ใช้ placeholder ถ้าไม่มีรูป) -->
          <img 
            :src="product.image || '/placeholder-product.png'" 
            :alt="product.name"
            class="product-image"
          >
          
          <!-- รายละเอียดสินค้า -->
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">฿{{ product.price.toLocaleString() }}</p>
            <p class="product-stock" :class="getStockClass(product.stock)">
              สต็อก: {{ product.stock }} ชิ้น
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    products: {
      type: Array,
      required: true,
      default: () => []
    },
    title: {
      type: String,
      default: 'สินค้าทั้งหมด'
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['select-product'])
  
  // ฟังก์ชันกำหนดคลาสตามจำนวนสต็อก
  const getStockClass = (stock) => {
    if (stock === 0) return 'out-of-stock'
    if (stock < 5) return 'low-stock'
    return 'in-stock'
  }
  </script>
  
  <style scoped>
  .product-list {
    padding: 1rem;
  }
  
  .product-list__title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .loading, .empty-message {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .product-card {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .product-info {
    padding: 1rem;
  }
  
  .product-name {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1a365d;
  }
  
  .product-price {
    font-weight: bold;
    color: #2b6cb0;
    margin-bottom: 0.25rem;
  }
  
  .product-stock {
    font-size: 0.875rem;
  }
  
  /* สไตล์สถานะสต็อก */
  .in-stock {
    color: #38a169;
  }
  
  .low-stock {
    color: #dd6b20;
  }
  
  .out-of-stock {
    color: #e53e3e;
  }
  </style>