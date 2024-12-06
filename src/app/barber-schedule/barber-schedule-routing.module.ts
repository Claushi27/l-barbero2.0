import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarberSchedulePage } from './barber-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: BarberSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarberSchedulePageRoutingModule {}
