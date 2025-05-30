<template>
  <div id="app">
    <div class="scroll-shadow" :class="{ visible: isScrolled }"></div>
    <nav class="header-nav" :class="{ scrolled: isScrolled }"></nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    }
  }
}
</script>

<style lang="scss">
/* Здесь будут глобальные стили */
@import '@/assets/styles/main.scss';
</style>