import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteRegularPage } from './reporte-regular.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteRegularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRegularPageRoutingModule {}
