<template>
  <div class="portfolio">
    <h2>Все работы</h2>
    <div class="works-grid">
      <WorkItem 
        v-for="(work, index) in works" 
        :key="index"
        :videoSrc="work.videoSrc"
      />
    </div>
  </div>
</template>

<script>
import WorkItem from '@/components/common/WorkItem.vue'

export default {
  name: 'Portfolio',
  components: {
    WorkItem
  },
  data() {
    return {
      works: [
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        // Добавьте больше работ
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.portfolio {
  padding: 80px 20px;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
</style>