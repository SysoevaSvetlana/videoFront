<template>
  <div class="form-overlay">
    <div class="appointment-form">
      <h3>Новая запись</h3>
      <p>Время: {{ formatDateTime(timeSlot.start) }} - {{ formatDateTime(timeSlot.end) }}</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Ваше имя:</label>
          <input v-model="formData.clientName" type="text" readonly />

        </div>

        <div class="form-group">
          <label>Email:</label>
          <input v-model="formData.clientEmail" required type="email" placeholder="ivan@example.com" />
        </div>

        <div class="form-group">
          <label>Описание (Расскажите какую съемку вы хотите и видеограф с вами обязательно свяжется):</label>
          <textarea v-model="formData.description" placeholder="Цель визита..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" @click="$emit('cancel')" class="cancel-btn">Отмена</button>
          <button type="submit" class="submit-btn">Записаться</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timeSlot: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        clientName: '',
        clientEmail: '',
        description: ''
      }
    };
  },
  created() {
    if (this.user) {
      if (this.user.name) this.formData.clientName = this.user.name;
      if (this.user.email) this.formData.clientEmail = this.user.email;
    }
  },
  methods: {
    formatDateTime(date) {
      return new Date(date).toLocaleString('ru-RU', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    handleSubmit() {
      this.$emit('submit', {
        clientName: this.formData.clientName,
        clientEmail: this.formData.clientEmail,
        description: this.formData.description,
        startTime: this.timeSlot.start,
        endTime: this.timeSlot.end
      });
    }
  }
};
</script>

<style scoped>
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.appointment-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h3 {
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn {
  background: #f5f5f5;
}

.submit-btn {
  background: #3f51b5;
  color: white;
}

.submit-btn:hover {
  background: #303f9f;
}
</style>
