import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCoordinadorPageRoutingModule } from './home-coordinador-routing.module';

import { HomeCoordinadorPage } from './home-coordinador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCoordinadorPageRoutingModule
  ],
  declarations: [HomeCoordinadorPage]
})
export class HomeCoordinadorPageModule {}
