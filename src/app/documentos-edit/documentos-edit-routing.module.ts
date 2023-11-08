import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosEditPage } from './documentos-edit.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosEditPageRoutingModule {}
