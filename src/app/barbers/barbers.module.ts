import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbersPageRoutingModule } from './barbers-routing.module';

import { BarbersPage } from './barbers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbersPageRoutingModule
  ],
  declarations: [BarbersPage]
})
export class BarbersPageModule {}
