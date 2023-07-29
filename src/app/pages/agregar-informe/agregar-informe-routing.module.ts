import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarInformePage } from './agregar-informe.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarInformePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarInformePageRoutingModule {}
