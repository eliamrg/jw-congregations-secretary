import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicadoresPage } from './publicadores.page';

const routes: Routes = [
  {
    path: '',
    component: PublicadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicadoresPageRoutingModule {}
