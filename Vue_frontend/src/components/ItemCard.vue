<!-- src/components/ItemCard.vue -->
<template>
    <div 
      class="item-card" 
      :class="{ 'item-card--clickable': clickable }"
      @click="handleClick"
    >
      <!-- Image Section -->
      <div v-if="image" class="item-card__image-container">
        <img :src="image" :alt="title" class="item-card__image" />
      </div>
  
      <!-- Content Section -->
      <div class="item-card__content">
        <h3 class="item-card__title">{{ title }}</h3>
        
        <p v-if="description" class="item-card__description">
          {{ description }}
        </p>
  
        <!-- Additional Information Slot -->
        <div v-if="$slots.additionalInfo" class="item-card__additional-info">
          <slot name="additionalInfo"></slot>
        </div>
  
        <!-- Price/Action Section -->
        <div class="item-card__footer">
          <span v-if="price" class="item-card__price">
            {{ formatPrice(price) }}
          </span>
  
          <div v-if="$slots.actions" class="item-card__actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemCard',
    props: {
      title: {
        type: String,
        required: true
      },
      image: {
        type: String,
        default: null
      },
      description: {
        type: String,
        default: null
      },
      price: {
        type: [Number, String],
        default: null
      },
      clickable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      formatPrice(price) {
        // Basic price formatting
        return typeof price === 'number' 
          ? `$${price.toFixed(2)}` 
          : price;
      },
      handleClick() {
        if (this.clickable) {
          this.$emit('card-click');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .item-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    transition: transform 0.3s ease;
  }
  
  .item-card--clickable {
    cursor: pointer;
  }
  
  .item-card--clickable:hover {
    transform: scale(1.05);
  }
  
  .item-card__image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .item-card__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .item-card__content {
    padding: 16px;
  }
  
  .item-card__title {
    font-size: 1.2rem;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .item-card__description {
    color: #666;
    margin-bottom: 12px;
  }
  
  .item-card__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
  
  .item-card__price {
    font-weight: bold;
    color: #2c3e50;
  }
  </style>