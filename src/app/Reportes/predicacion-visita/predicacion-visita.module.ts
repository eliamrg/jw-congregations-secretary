import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredicacionVisitaPageRoutingModule } from './predicacion-visita-routing.module';

import { PredicacionVisitaPage } from './predicacion-visita.page';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredicacionVisitaPageRoutingModule,
    NgxPrintModule
  ],
  declarations: [PredicacionVisitaPage]
})
export class PredicacionVisitaPageModule {}
