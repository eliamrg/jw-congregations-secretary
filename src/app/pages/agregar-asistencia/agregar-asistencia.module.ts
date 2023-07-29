import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarAsistenciaPageRoutingModule } from './agregar-asistencia-routing.module';

import { AgregarAsistenciaPage } from './agregar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarAsistenciaPageRoutingModule
  ],
  declarations: [AgregarAsistenciaPage]
})
export class AgregarAsistenciaPageModule {}
