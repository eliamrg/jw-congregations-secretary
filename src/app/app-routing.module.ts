import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/informe',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'publicadores',
    loadChildren: () => import('./pages/publicadores/publicadores.module').then( m => m.PublicadoresPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/agregar-asistencia/agregar-asistencia.module').then( m => m.AgregarAsistenciaPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'informe',
    loadChildren: () => import('./pages/agregar-informe/agregar-informe.module').then( m => m.AgregarInformePageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'publicador/:id',
    loadChildren: () => import('./pages/tarjeta-publicador/tarjeta-publicador.module').then( m => m.TarjetaPublicadorPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'audio-video',
    loadChildren: () => import('./pages/audio-video/audio-video.module').then( m => m.AudioVideoPageModule)
  },
  {
    path: 'reporte-regular',
    loadChildren: () => import('./Reportes/reporte-regular/reporte-regular.module').then( m => m.ReporteRegularPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'reporte-auxiliar',
    loadChildren: () => import('./Reportes/reporte-auxiliar/reporte-auxiliar.module').then( m => m.ReporteAuxiliarPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'reporte-publicador',
    loadChildren: () => import('./Reportes/reporte-publicador/reporte-publicador.module').then( m => m.ReportePublicadorPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'reporte-asistencia',
    loadChildren: () => import('./Reportes/reporte-asistencia/reporte-asistencia.module').then( m => m.ReporteAsistenciaPageModule),
    ...canActivate(()=>redirectUnauthorizedTo(['/login']))
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
