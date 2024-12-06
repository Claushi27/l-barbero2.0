import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage-angular';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  appointmentTime: string = '';
  appointmentDescription: string = '';
  selectedBarber: string = '';
  barbers: string[] = [];
  selectedDate: string = '';
  showForm: boolean = false;
  availableTimes: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    height: '100%',
    events: [],
    locale: esLocale
  };

  constructor(private authService: AuthService, private storage: Storage) {}

  ngOnInit() {
    this.loadBarbers();
    this.loadUserAppointments();
  }

  loadBarbers() {
    this.barbers = this.authService.getBarbers();
  }

  async loadUserAppointments() {
    const currentUser = await this.authService.loadCurrentUser();
    if (currentUser) {
      const appointments = await this.storage.get(`${currentUser.username}_appointments`);
      if (appointments) {
        this.calendarOptions.events = appointments.map((appointment: any) => ({
          title: `${appointment.description} - ${appointment.barber}`,
          start: `${appointment.date}T${appointment.time}`,
        }));
      }
    }
  }

  handleDateClick(arg: any) {
    this.selectedDate = arg.dateStr;
    this.showForm = true;
    this.appointmentDescription = '';
    this.selectedBarber = '';
    this.appointmentTime = '';
  }

  async addAppointment() {
    if (this.selectedDate && this.appointmentTime && this.appointmentDescription && this.selectedBarber) {
      const currentUser = await this.authService.loadCurrentUser();
       
      if (currentUser) {
        const appointments = await this.storage.get(`${currentUser.username}_appointments`) || [];
        
        const isDuplicate = appointments.some((apt: any) => 
          apt.date === this.selectedDate &&
          apt.time === this.appointmentTime &&
          apt.description === this.appointmentDescription &&
          apt.barber === this.selectedBarber
        );
  
        if (isDuplicate) {
          return;
        }
  
        const newAppointment = {
          date: this.selectedDate,
          time: this.appointmentTime,
          description: this.appointmentDescription,
          barber: this.selectedBarber,
        };
  
        appointments.push(newAppointment);
        await this.storage.set(`${currentUser.username}_appointments`, appointments);
  
        this.calendarOptions.events = Array.isArray(this.calendarOptions.events)
          ? [
              ...this.calendarOptions.events,
              {
                title: `${newAppointment.description} - ${newAppointment.barber}`,
                start: `${newAppointment.date}T${newAppointment.time}`,
              }
            ]
          : [{
              title: `${newAppointment.description} - ${newAppointment.barber}`,
              start: `${newAppointment.date}T${newAppointment.time}`,
            }];
  
        this.showForm = false;
      }
    }
  }

  cancelAppointment() {
    this.showForm = false;
  }
}