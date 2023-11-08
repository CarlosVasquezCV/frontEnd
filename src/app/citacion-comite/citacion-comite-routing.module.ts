import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitacionComitePage } from './citacion-comite.page';

const routes: Routes = [
  {
    path: '',
    component: CitacionComitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitacionComitePageRoutingModule {}
