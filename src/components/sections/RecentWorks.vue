<template>
  <section class="recent-works">
    <h2>Последние работы</h2>
    <div class="works-grid">
      <WorkItem 
        v-for="(work, index) in works" 
        :key="index"
        :videoSrc="work.videoSrc"
        :autoplay="false"
      />
    </div>
    <router-link to="/portfolio" class="btn-more">Смотреть больше</router-link>
  </section>
</template>

<script>
import WorkItem from '@/components/common/WorkItem.vue'

export default {
  name: 'RecentWorks',
  components: {
    WorkItem
  },
  data() {
    return {
      works: [
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.recent-works {
  padding: 80px 20px;
  background-color: #e0e0e0;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.btn-more {
  display: block;
  width: max-content;
  margin: 0 auto;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  border: 2px solid #333;
  transition: all 0.3s;
  
  &:hover {
    background: #333;
    color: white;
  }
}
</style>