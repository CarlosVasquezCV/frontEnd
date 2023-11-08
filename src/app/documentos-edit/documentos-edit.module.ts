import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosEditPageRoutingModule } from './documentos-edit-routing.module';

import { DocumentosEditPage } from './documentos-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosEditPageRoutingModule
  ],
  declarations: [DocumentosEditPage]
})
export class DocumentosEditPageModule {}
