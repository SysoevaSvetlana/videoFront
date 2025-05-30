<template>
  <div class="work-item">
    <video 
      :src="videoSrc" 
      :autoplay="autoplay"
      @mouseenter="playVideo"
      @mouseleave="pauseVideo"
      ref="videoElement"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'WorkItem',
  props: {
    videoSrc: {
      type: String,
      required: true
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playVideo() {
      this.$refs.videoElement.play();
    },
    pauseVideo() {
      this.$refs.videoElement.pause();
      this.$refs.videoElement.currentTime = 0;
    }
  }
}
</script>

<style scoped lang="scss">
.work-item {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;

  video {
    width: 100%;
    height: auto;
    cursor: pointer;
  }
}
</style>