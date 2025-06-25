<template>
  <section class="recent-works">
    <h2>Последние работы</h2>

    <Swiper
      :modules="[Navigation]"
      :slides-per-view="3"
      :space-between="20"
      navigation
      class="works-swiper"
    >
      <SwiperSlide v-for="(work, index) in works" :key="index">
        <WorkItem :videoSrc="work.videoSrc" :autoplay="false" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules'; // ✅ Правильный импорт
import 'swiper/css';
import 'swiper/css/navigation';

import WorkItem from '@/components/common/WorkItem.vue';

export default {
  name: 'RecentWorks',
  components: {
    Swiper,
    SwiperSlide,
    WorkItem,
  },
  data() {
    return {
      Navigation, // ✅ доступ к Navigation через data
      works: [
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
        { videoSrc: require('@/assets/video/1.mp4') },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.recent-works {
  padding: 80px 20px;
  background-color: #e0e0e0;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-weight: 700;
  color: #222;
}

.works-swiper {
  width: 100%;

  .swiper-button-next,
  .swiper-button-prev {
    color: #333;
    top: 45%;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: background-color 0.3s ease;

    &:hover {
      background: #333;
      color: white;
    }
  }
}
</style>
