<template>
  <section class="pricing">
    <h2>Услуги и цены</h2>
    <div class="pricing-grid">
      <PriceCard 
        v-for="(item, index) in pricingItems"
        :key="index"
        :title="item.title"
        :price="item.price"
        :features="item.features"
      />
    </div>
  </section>
</template>

<script>
import PriceCard from '@/components/common/PriceCard.vue'

export default {
  name: 'PricingSection',
  components: {
    PriceCard
  },
  data() {
    return {
      pricingItems: [
        {
          title: 'Базовый',
          price: 'от 15 000 ₽',
          features: ['Пункт 1', 'Пункт 2', 'Пункт 3']
        },
        {
          title: 'Стандарт',
          price: 'от 25 000 ₽',
          features: ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4']
        },
        {
          title: 'Премиум',
          price: 'от 40 000 ₽',
          features: ['Пункт 1', 'Пункт 2', 'Пункт 3', 'Пункт 4', 'Пункт 5']
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.pricing {
  padding: 80px 20px;
  background-color: #e0e0e0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>