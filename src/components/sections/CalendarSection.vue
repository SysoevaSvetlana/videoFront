<template>
  <div class="calendar-container">
    <FullCalendar
      ref="fullCalendar"
      :options="calendarOptions"
    />
    
    <AppointmentForm
      v-if="showForm"
      :time-slot="selectedTimeSlot"
      @submit="handleFormSubmit"
      @cancel="closeForm"
    />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      showForm: false,
      selectedTimeSlot: null,
      calendarOptions: {
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
        businessHours: this.getBusinessHours(),
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
    }
  },
  methods: {
    async fetchEvents(info, successCallback, failureCallback) {
      try {
        const response = await axios.get('/api/appointments/slots', {
          params: {
            start: info.start.toISOString(),
            end: info.end.toISOString()
          }
        });
        
        const events = response.data.map(appointment => ({
          id: appointment.id,
          title: `Запись: ${appointment.clientName}`,
          start: appointment.startTime,
          end: appointment.endTime,
          backgroundColor: appointment.status === 'CONFIRMED' ? '#ff9f89' : '#ffd3b6',
          extendedProps: {
            description: appointment.description,
            status: appointment.status
          }
        }));
        
        successCallback(events);
      } catch (error) {
        console.error('Error fetching events:', error);
        failureCallback(error);
      }
    },
    
    getBusinessHours() {
      return {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '18:00'
      };
    },
    
    handleDateSelect(selectInfo) {
      this.selectedTimeSlot = {
        start: selectInfo.start,
        end: selectInfo.end
      };
      this.showForm = true;
      
      // Очищаем выделение
      selectInfo.view.calendar.unselect();
    },
    
    handleEventClick(clickInfo) {
      alert(`Детали записи:
        Клиент: ${clickInfo.event.title}
        Время: ${clickInfo.event.start.toLocaleString()} - ${clickInfo.event.end.toLocaleString()}
        Статус: ${clickInfo.event.extendedProps.status}
        Описание: ${clickInfo.event.extendedProps.description || 'нет'}`);
    },
    
    async handleFormSubmit(formData) {
      try {
        const appointmentData = {
          ...formData,
          startTime: this.selectedTimeSlot.start,
          endTime: this.selectedTimeSlot.end,
          ownerEmail: 'owner@example.com' // Замените на реальный email
        };
        
        await axios.post('/api/appointments', appointmentData);
        
        this.closeForm();
        this.refreshCalendar();
        alert('Запись успешно создана! На почту отправлено подтверждение.');
      } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Ошибка при создании записи: ' + error.response?.data?.message || error.message);
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
}
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