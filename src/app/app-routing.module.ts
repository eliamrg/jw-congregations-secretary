import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/publicadores',
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
    path: 'agregar-asistencia',
    loadChildren: () => import('./agregar-asistencia/agregar-asistencia.module').then( m => m.AgregarAsistenciaPageModule)
  },
  {
    path: 'agregar-informe',
    loadChildren: () => import('./agregar-informe/agregar-informe.module').then( m => m.AgregarInformePageModule)
  },
  {
    path: 'tarjeta-publicador',
    loadChildren: () => import('./tarjeta-publicador/tarjeta-publicador.module').then( m => m.TarjetaPublicadorPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
