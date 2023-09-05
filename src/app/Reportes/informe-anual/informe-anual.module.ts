import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeAnualPageRoutingModule } from './informe-anual-routing.module';

import { InformeAnualPage } from './informe-anual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeAnualPageRoutingModule
  ],
  declarations: [InformeAnualPage]
})
export class InformeAnualPageModule {}
