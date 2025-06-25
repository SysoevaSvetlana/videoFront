<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>Войдите через Google</h2>
      <button @click="signInWithGoogle">Войти</button>
      <button @click="$emit('close')">Отмена</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async signInWithGoogle() {
      try {
        
        // Здесь вызывается backend, начинающий Google OAuth 2.0 авторизацию
        const popup = window.open('/api/oauth2/authorize/google', '_blank', 'width=500,height=600');
        
        const interval = setInterval(() => {
          try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
              clearInterval(interval);
              this.$emit('close'); // Закрываем модалку
            }
          } catch (e) {}
        }, 500);
      } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Ошибка при входе через Google');
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
}
</style>
