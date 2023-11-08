import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FelicitarAprendizPage } from './felicitar-aprendiz.page';

const routes: Routes = [
  {
    path: '',
    component: FelicitarAprendizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FelicitarAprendizPageRoutingModule {}
