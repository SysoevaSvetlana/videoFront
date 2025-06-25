<template>
  <div class="work-item">
    <video 
      :src="videoSrc" 
      :autoplay="autoplay"
      muted
      ref="videoElement"
      preload="metadata"
      playsinline
      @mouseenter="playVideo"
      @mouseleave="pauseVideo"
      @click="toggleFullscreen"
      class="work-video"
    ></video>

    <button 
      v-if="isFullscreen" 
      class="btn-exit-fullscreen" 
      @click.stop="exitFullscreen"
      title="Закрыть полноэкранный режим"
    >
      ✕
    </button>
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
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    playVideo() {
      this.$refs.videoElement.play().catch(() => {})
    },
    pauseVideo() {
      this.$refs.videoElement.pause();
      this.$refs.videoElement.currentTime = 0;
    },
    toggleFullscreen() {
      const video = this.$refs.videoElement;
      if (!this.isFullscreen) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      } else {
        this.exitFullscreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    fullscreenChangeHandler() {
      const fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      this.isFullscreen = fsElem === this.$refs.videoElement;
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', this.fullscreenChangeHandler);
    document.addEventListener('msfullscreenchange', this.fullscreenChangeHandler);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', this.fullscreenChangeHandler);
    document.removeEventListener('msfullscreenchange', this.fullscreenChangeHandler);
  }
}
</script>

<style scoped lang="scss">
.work-item {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;

  .work-video {
    width: 100%;
    height: auto;
    border-radius: 6px;
    transition: transform 0.3s ease;
    background: black;
  }
  &:hover .work-video {
    transform: scale(1.05);
  }
}

.btn-exit-fullscreen {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  background: rgba(0,0,0,0.7);
  border: none;
  color: white;
  font-size: 20px;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
}
.btn-exit-fullscreen:hover {
  background: rgba(0,0,0,0.9);
}
</style>
