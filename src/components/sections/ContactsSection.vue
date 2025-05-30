<template>
  <section class="contacts">
    <h2>Контакты</h2>
    <div class="contacts-content">
      <div class="contact-info">
        <p>Телефон: <a href="tel:+7XXXXXXXXXX">+7 (XXX) XXX-XX-XX</a></p>
        <p>Email: <a href="mailto:example@email.com">example@email.com</a></p>
        <div class="social-links">
          <a v-for="(social, index) in socialLinks" 
             :key="index"
             :href="social.url" 
             target="_blank"
             :title="social.name">
            <img :src="social.icon" :alt="social.name">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactsSection',
  data() {
    return {
      socialLinks: [
        {
          name: 'Instagram',
          url: 'https://instagram.com/',
          icon: require('@/assets/img/social-icons/instagram.svg')
        },
        {
          name: 'VKontakte',
          url: 'https://vk.com/',
          icon: require('@/assets/img/social-icons/vk.svg')
        },
        {
          name: 'Telegram',
          url: 'https://t.me/',
          icon: require('@/assets/img/social-icons/telegram.svg')
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.contacts {
  padding: 80px 20px;
  background-color: #000000;
  color: white;
}

.contacts-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.contact-info a {
  color: white;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;

  a {
    display: inline-block;
    transition: transform 0.3s;
    
    &:hover {
      transform: scale(1.2);
    }
  }

  img {
    width: 24px;
    height: 24px;
    filter: brightness(0) invert(1);
  }
}
</style>