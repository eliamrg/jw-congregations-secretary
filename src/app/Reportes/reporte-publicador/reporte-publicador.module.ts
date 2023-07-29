import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportePublicadorPageRoutingModule } from './reporte-publicador-routing.module';

import { ReportePublicadorPage } from './reporte-publicador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportePublicadorPageRoutingModule
  ],
  declarations: [ReportePublicadorPage]
})
export class ReportePublicadorPageModule {}
