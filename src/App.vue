<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // сюда можно добавить данные, если нужно
    }
  },
  mounted() {
    // сюда можно добавить код, который выполнится при монтировании
  },
  beforeDestroy() {
    // сюда можно добавить очистку перед уничтожением компонента
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>
