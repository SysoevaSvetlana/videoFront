<template>
  <div class="home">
    <HeroSection />
    <RecentWorks />
    <AboutSection />
    <PricingSection />
    <CalendarSection />
    <ContactsSection />
  </div>
</template>

<script>
import HeroSection from '@/components/sections/HeroSection.vue'
import RecentWorks from '@/components/sections/RecentWorks.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
import CalendarSection from '@/components/sections/CalendarSection.vue'
import ContactsSection from '@/components/sections/ContactsSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    RecentWorks,
    AboutSection,
    PricingSection,
    CalendarSection,
    ContactsSection
  },
  mounted() {
    this.initScrollShadow()
    this.initWorkVideos()
  },
  methods: {
    initScrollShadow() {
      const shadowElement = document.querySelector('.scroll-shadow')
      
      window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
          const scrollPercent = Math.min(window.scrollY / 300, 1)
          shadowElement.style.opacity = scrollPercent
        })
      })
    },
    initWorkVideos() {
      const workVideos = document.querySelectorAll('.work-item video')
      workVideos.forEach(video => {
        video.setAttribute('preload', 'metadata')
        video.setAttribute('playsinline', '')
      })
    }
  }
}
</script>