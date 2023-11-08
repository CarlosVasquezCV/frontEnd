import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosPage } from './documentos.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosPageRoutingModule {}
