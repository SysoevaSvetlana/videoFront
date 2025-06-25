<template>
  <header class="hero">
    <video autoplay muted loop ref="heroVideo">
      <source :src="videoSrc" type="video/mp4">
    </video>
    <div class="hero-content">
      <h1>Имя Фамилия</h1>
      <p>Профессиональная видеосъемка</p>
    </div>
  </header>
</template>

<script>
import heroVideo from '@/assets/video/1.mp4';

export default {
  name: 'HeroSection',
  data() {
    return {
      videoSrc: heroVideo
    };
  },
  mounted() {
    const heroVideo = this.$refs.heroVideo;
    if (heroVideo) {
      heroVideo.addEventListener('loadeddata', function () {
        console.log('Фоновое видео загружено');
      });
    }
  }
};
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  z-index: 1;

  video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
    object-fit: cover;
  }

  .hero-content {
    position: relative;
    text-align: center;
    color: white;
    padding-top: 40vh;

    h1 {
      font-size: 7rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 4px;
      margin-bottom: 30px;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
    }

    p {
      font-size: 2.5rem;
      font-weight: 400;
      letter-spacing: 2px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 4.5rem;
  }

  .hero-content p {
    font-size: 2rem;
  }
}
</style>
