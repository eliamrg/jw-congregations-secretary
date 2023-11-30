import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicadoresPageRoutingModule } from './publicadores-routing.module';

import { PublicadoresPage } from './publicadores.page';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicadoresPageRoutingModule,
    NgxPrintModule
  ],
  declarations: [PublicadoresPage]
})
export class PublicadoresPageModule {}
