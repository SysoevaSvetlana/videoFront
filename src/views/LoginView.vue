<template>
  <div class="login-view">
    <h2>Добро пожаловать</h2>
    <button @click="redirectToGoogle" class="google-login-button">
      Войти через Google
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToGoogle() {
      // 🔁 НЕ напрямую к Google, а на свой Spring Boot backend:
      window.location.href = 'http://localhost:8080/api/auth/oauth2/authorize/google';
    }
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.google-login-button {
  padding: 12px 24px;
  background-color: #4285f4;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
