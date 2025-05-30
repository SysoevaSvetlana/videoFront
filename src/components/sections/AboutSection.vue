<template>
  <section class="about">
    <div class="about-content">
      <img :src="authorImage" alt="Фото автора">
      <div class="about-text">
        <h2>Об авторе</h2>
        <p>{{ aboutText }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      authorImage: require('@/assets/img/author.jpg'),
      aboutText: 'Текст об авторе... Здесь должно быть подробное описание вашего опыта, стиля работы и профессионального подхода к видеосъемке.'
    }
  }
}
</script>

<style scoped lang="scss">
.about {
  padding: 80px 20px;
  background-color: #ffffff;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    text-align: center;
    
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>