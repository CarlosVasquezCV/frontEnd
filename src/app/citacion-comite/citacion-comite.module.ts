import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitacionComitePageRoutingModule } from './citacion-comite-routing.module';

import { CitacionComitePage } from './citacion-comite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitacionComitePageRoutingModule
  ],
  declarations: [CitacionComitePage]
})
export class CitacionComitePageModule {}
