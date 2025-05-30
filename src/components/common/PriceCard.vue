<template>
  <div class="price-card">
    <h3>{{ title }}</h3>
    <p class="price">{{ price }}</p>
    <ul>
      <li v-for="(item, index) in features" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PriceCard',
  props: {
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.price-card {
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    margin: 20px 0;
  }

  li {
    margin: 10px 0;
  }
}
</style>