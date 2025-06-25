<template>
  <div class="calendar-container">
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />

    <AppointmentForm
      v-if="showForm"
      :time-slot="selectedTimeSlot"
      :user="user"
      @submit="handleFormSubmit"
      @cancel="closeForm"
    />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

import AppointmentForm from './AppointmentForm.vue';

export default {
  components: {
    FullCalendar,
    AppointmentForm
  },
  data() {
    return {
      showForm: false,
       isSubmitting: false,
      selectedTimeSlot: null,
      user: null,
      calendarOptions: {
         events: this.fetchEvents,

  /* ⬇︎  блокируем выделение пересекающихся слотов  */
        selectOverlap: false,

  /* ⬇︎  «глушим» клик по занятым событиям */
        eventClick: this.handleEventClick,
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: 'auto',
        nowIndicator: true,
        editable: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: false,
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '18:00'
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        slotDuration: '00:30:00',
        events: this.fetchEvents,
        eventBackgroundColor: '#ff9f89',
        eventBorderColor: '#ff9f89',
        eventTextColor: '#fff',
        eventDisplay: 'block',
        select: this.handleDateSelect,
        eventClick: this.handleEventClick
      }
    };
  },
  methods: {
    async signInWithGoogle() {
      return new Promise((resolve) => {
        const popup = window.open(
          'http://localhost:8080/api/auth/oauth2/authorize/google',
          '_blank',
          'width=500,height=600'
        );

        const listener = (event) => {
          if (event.origin !== 'http://localhost:8080') return;

          if (event.data?.type === 'oauth-success') {
            this.user = event.data.user;
            const saved = localStorage.getItem('user');
            if (saved) {
              this.user = JSON.parse(saved);
              window.removeEventListener('message', listener);
              resolve();
            }
          }
        };

        window.addEventListener('message', listener);
      });
    },

    async handleDateSelect(selectInfo) {
      this.selectedTimeSlot = {
        start: selectInfo.start,
        end: selectInfo.end
      };

      if (!this.user) {
        await this.signInWithGoogle();

        if (!this.user) {
          alert('Ошибка авторизации. Попробуйте снова.');
          return;
        }
      }

      this.showForm = true;
      selectInfo.view.calendar.unselect();
    },

    // async fetchEvents(info, successCallback, failureCallback) {
    //   try {
    //     const response = await axios.get('http://localhost:8080/api/appointments/slots', {
    //       params: {
    //         start: info.start.toISOString(),
    //         end: info.end.toISOString()
    //       }
    //     });

    //     const events = response.data.map(appointment => ({
    //       id: appointment.id,
    //       title: `Запись: ${appointment.clientName}`,
    //       start: appointment.startTime,
    //       end: appointment.endTime,
    //       backgroundColor: appointment.status === 'CONFIRMED' ? '#ff9f89' : '#ffd3b6',
    //       extendedProps: {
    //         description: appointment.description,
    //         status: appointment.status
    //       }
    //     }));

    //     successCallback(events);
    //   } catch (error) {
    //     console.error('Ошибка при загрузке событий:', error);
    //     failureCallback(error);
    //   }
    // },

    handleEventClick(clickInfo) {
     if (
    clickInfo.event.extendedProps.busy || 
    clickInfo.event.display === 'background'
  ) {
    return;
  }
      alert(`Детали записи:\nКлиент: ${clickInfo.event.title}\nВремя: ${clickInfo.event.start.toLocaleString()} - ${clickInfo.event.end.toLocaleString()}\nСтатус: ${clickInfo.event.extendedProps.status}\nОписание: ${clickInfo.event.extendedProps.description || 'нет'}`);
    },


    async fetchEvents(info, successCallback, failureCallback) {
  try {
    const response = await axios.get('http://localhost:8080/api/appointments/slots', {
      params: {
        start: info.start.toISOString(),
        end: info.end.toISOString()
      }
    });

    const events = response.data.map(slot => ({
      start: slot.start,             // ISO-строки приходят готовые
      end:   slot.end,
      title: slot.title,
      backgroundColor: slot.backgroundColor,
      display: slot.display,
      busy: true,               // <-- своё поле
      overlap: false            // запрет накладываться на него          // "background"
    }));

    successCallback(events);
  } catch (err) {
    console.error('Ошибка при загрузке событий', err);
    failureCallback(err);
  }
},



    async handleFormSubmit(formData) {
      if (this.isSubmitting) return;      
      this.isSubmitting = true;
      try {
        const appointmentData = {
          ...formData,
          ownerEmail: 'priklinf13@gmail.com'
        };

        await axios.post('http://localhost:8080/api/appointments', appointmentData);

        this.closeForm();
        this.refreshCalendar();
        alert('Запись успешно создана!');
      } catch (error) {
        console.error('Ошибка при создании записи:', error);
        alert('Ошибка: ' + (error.response?.data?.message || error.message));
      }
      finally {
      this.isSubmitting = false;        
    }
    },

    closeForm() {
      this.showForm = false;
      this.selectedTimeSlot = null;
    },

    refreshCalendar() {
      this.$refs.fullCalendar.getApi().refetchEvents();
    }
  }
};
</script>


<style scoped>
.calendar-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Стили для FullCalendar */
:deep(.fc) {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:deep(.fc-header-toolbar) {
  margin-bottom: 1em;
}

:deep(.fc-daygrid-event) {
  border-radius: 4px;
  cursor: pointer;
}

:deep(.fc-timegrid-slot) {
  height: 2.5em;
}

:deep(.fc-timegrid-event) {
  border-radius: 4px;
  padding: 2px 4px;
  cursor: pointer;
}

:deep(.fc-day-past) {
  background-color: #f9f9f9;
}

:deep(.fc-day-future) {
  background-color: #ffffff;
}

:deep(.fc-non-business) {
  background-color: #f8f9fa;
}

:deep(.fc-highlight) {
  background: rgba(63, 81, 181, 0.2);
}
</style>
