import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteRegularPageRoutingModule } from './reporte-regular-routing.module';

import { ReporteRegularPage } from './reporte-regular.page';
import { TablaInformeComponent } from 'src/app/components/tabla-informe/tabla-informe.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteRegularPageRoutingModule,
    NgxPrintModule
    
  ],
  declarations: [ReporteRegularPage, TablaInformeComponent]
})
export class ReporteRegularPageModule {}
