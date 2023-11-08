import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LlamadoAtencionPage } from './llamado-atencion.page';

const routes: Routes = [
  {
    path: '',
    component: LlamadoAtencionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LlamadoAtencionPageRoutingModule {}
