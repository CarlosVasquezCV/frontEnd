import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FelicitarAprendizPageRoutingModule } from './felicitar-aprendiz-routing.module';

import { FelicitarAprendizPage } from './felicitar-aprendiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FelicitarAprendizPageRoutingModule
  ],
  declarations: [FelicitarAprendizPage]
})
export class FelicitarAprendizPageModule {}
