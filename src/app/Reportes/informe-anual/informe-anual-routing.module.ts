import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAnualPage } from './informe-anual.page';

const routes: Routes = [
  {
    path: '',
    component: InformeAnualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAnualPageRoutingModule {}
