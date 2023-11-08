import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'felicitar-aprendiz',
    loadChildren: () => import('./felicitar-aprendiz/felicitar-aprendiz.module').then( m => m.FelicitarAprendizPageModule)
  },
  {
    path: 'llamado-atencion',
    loadChildren: () => import('./llamado-atencion/llamado-atencion.module').then( m => m.LlamadoAtencionPageModule)
  },
  {
    path: 'citacion-comite',
    loadChildren: () => import('./citacion-comite/citacion-comite.module').then( m => m.CitacionComitePageModule)
  },
  {
    path: 'home-coordinador',
    loadChildren: () => import('./home-coordinador/home-coordinador.module').then( m => m.HomeCoordinadorPageModule)
  },
  {
    path: 'lista-citados',
    loadChildren: () => import('./lista-citados/lista-citados.module').then( m => m.ListaCitadosPageModule)
  },
  {
    path: 'documentos',
    loadChildren: () => import('./documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'documentos-edit',
    loadChildren: () => import('./documentos-edit/documentos-edit.module').then( m => m.DocumentosEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
