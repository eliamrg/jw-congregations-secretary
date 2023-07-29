import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportePublicadorPage } from './reporte-publicador.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePublicadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportePublicadorPageRoutingModule {}
