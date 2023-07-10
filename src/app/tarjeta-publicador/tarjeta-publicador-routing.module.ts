import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetaPublicadorPage } from './tarjeta-publicador.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetaPublicadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetaPublicadorPageRoutingModule {}
