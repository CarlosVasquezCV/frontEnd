import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCitadosPageRoutingModule } from './lista-citados-routing.module';

import { ListaCitadosPage } from './lista-citados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCitadosPageRoutingModule
  ],
  declarations: [ListaCitadosPage]
})
export class ListaCitadosPageModule {}
