import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCitadosPage } from './lista-citados.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCitadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCitadosPageRoutingModule {}
