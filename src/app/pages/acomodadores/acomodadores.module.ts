import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcomodadoresPageRoutingModule } from './acomodadores-routing.module';

import { AcomodadoresPage } from './acomodadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcomodadoresPageRoutingModule
  ],
  declarations: [AcomodadoresPage]
})
export class AcomodadoresPageModule {}
