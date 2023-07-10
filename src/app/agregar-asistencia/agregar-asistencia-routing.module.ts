import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarAsistenciaPage } from './agregar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarAsistenciaPageRoutingModule {}
