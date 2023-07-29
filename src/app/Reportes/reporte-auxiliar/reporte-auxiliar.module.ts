import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteAuxiliarPageRoutingModule } from './reporte-auxiliar-routing.module';

import { ReporteAuxiliarPage } from './reporte-auxiliar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteAuxiliarPageRoutingModule
  ],
  declarations: [ReporteAuxiliarPage]
})
export class ReporteAuxiliarPageModule {}
