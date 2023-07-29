import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteAsistenciaPageRoutingModule } from './reporte-asistencia-routing.module';

import { ReporteAsistenciaPage } from './reporte-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteAsistenciaPageRoutingModule
  ],
  declarations: [ReporteAsistenciaPage]
})
export class ReporteAsistenciaPageModule {}
