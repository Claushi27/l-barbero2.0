import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Appointment {
  client: string;
  date: string;
  time: string;
  description: string;
  barber: string;
}

@Component({
  selector: 'app-barber-schedule',
  templateUrl: './barber-schedule.page.html',
  styleUrls: ['./barber-schedule.page.scss'],
})
export class BarberSchedulePage implements OnInit {
  appointments: Appointment[] = [];
  currentUser: any;
  calendarOptions: CalendarOptions;
  selectedDayAppointments: Appointment[] = [];

  constructor(
    private storage: Storage,
    private router: Router,
    private authService: AuthService
  ) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      height: 'auto',
      eventClick: this.handleEventClick.bind(this),
      events: []
    };
  }

  async ngOnInit() {
    await this.storage.create();
    this.currentUser = await this.authService.loadCurrentUser();

    if (this.currentUser && this.currentUser.role === 'barbero') {
      await this.loadAppointments();
    }
  }

  async loadAppointments() {
    const clients = await this.storage.get('clients') || [];
    const uniqueAppointments: Set<string> = new Set();
    const calendarEvents: EventInput[] = [];

    for (const client of clients) {
      const clientAppointments: Appointment[] = await this.storage.get(`${client.username}_appointments`) || [];
      
      const barberAppointments = clientAppointments
        .filter((apt: Appointment) => apt.barber === this.currentUser.username)
        .map((apt: Appointment) => ({
          ...apt,
          client: client.username
        }));

      barberAppointments.forEach((apt: Appointment) => {
        const uniqueKey = `${apt.date}-${apt.time}-${apt.description}`;
        if (!uniqueAppointments.has(uniqueKey)) {
          uniqueAppointments.add(uniqueKey);
          calendarEvents.push({
            title: `${apt.client} - ${apt.description}`,
            date: apt.date,
            allDay: false,
            start: `${apt.date}T${apt.time}`,
            extendedProps: { 
              appointment: apt 
            }
          });
        }
      });
    }

    this.calendarOptions = {
      ...this.calendarOptions,
      events: calendarEvents
    };
  }

  handleEventClick(info: any) {
    const apt = info.event.extendedProps.appointment;
    this.selectedDayAppointments = [apt];
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  async logout() {
    await this.storage.remove('currentUser');
    this.router.navigate(['/login']);
  }
}