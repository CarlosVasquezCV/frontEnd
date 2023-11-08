import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LlamadoAtencionPageRoutingModule } from './llamado-atencion-routing.module';

import { LlamadoAtencionPage } from './llamado-atencion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LlamadoAtencionPageRoutingModule
  ],
  declarations: [LlamadoAtencionPage]
})
export class LlamadoAtencionPageModule {}
