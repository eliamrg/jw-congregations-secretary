import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportePredicacionPageRoutingModule } from './reporte-predicacion-routing.module';

import { ReportePredicacionPage } from './reporte-predicacion.page';
import { NgxPrintModule } from 'ngx-print';
import { TablaInformeComponent } from 'src/app/components/tabla-informe/tabla-informe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePredicacionPageRoutingModule,
    NgxPrintModule
  ],
  declarations: [ReportePredicacionPage,TablaInformeComponent]
})
export class ReportePredicacionPageModule {}
