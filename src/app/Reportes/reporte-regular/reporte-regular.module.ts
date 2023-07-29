import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteRegularPageRoutingModule } from './reporte-regular-routing.module';

import { ReporteRegularPage } from './reporte-regular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteRegularPageRoutingModule
  ],
  declarations: [ReporteRegularPage]
})
export class ReporteRegularPageModule {}
