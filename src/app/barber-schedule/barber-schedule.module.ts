import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';

import { BarberSchedulePageRoutingModule } from './barber-schedule-routing.module';

import { BarberSchedulePage } from './barber-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    BarberSchedulePageRoutingModule
  ],
  declarations: [BarberSchedulePage]
})
export class BarberSchedulePageModule {}
