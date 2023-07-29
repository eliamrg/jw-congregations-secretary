import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteAuxiliarPage } from './reporte-auxiliar.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteAuxiliarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteAuxiliarPageRoutingModule {}
