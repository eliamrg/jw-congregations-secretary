import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcomodadoresPage } from './acomodadores.page';

const routes: Routes = [
  {
    path: '',
    component: AcomodadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcomodadoresPageRoutingModule {}
