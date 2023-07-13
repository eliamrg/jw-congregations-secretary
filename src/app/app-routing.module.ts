import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/informe',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'publicadores',
    loadChildren: () => import('./publicadores/publicadores.module').then( m => m.PublicadoresPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./agregar-asistencia/agregar-asistencia.module').then( m => m.AgregarAsistenciaPageModule)
  },
  {
    path: 'informe',
    loadChildren: () => import('./agregar-informe/agregar-informe.module').then( m => m.AgregarInformePageModule)
  },
  {
    path: 'publicador/:id',
    loadChildren: () => import('./tarjeta-publicador/tarjeta-publicador.module').then( m => m.TarjetaPublicadorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
