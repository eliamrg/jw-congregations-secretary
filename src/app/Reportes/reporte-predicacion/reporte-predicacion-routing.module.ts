import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePredicacionPage } from './reporte-predicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePredicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePredicacionPageRoutingModule {}
