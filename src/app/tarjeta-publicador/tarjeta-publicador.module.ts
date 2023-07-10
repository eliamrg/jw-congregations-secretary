import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetaPublicadorPageRoutingModule } from './tarjeta-publicador-routing.module';

import { TarjetaPublicadorPage } from './tarjeta-publicador.page';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetaPublicadorPageRoutingModule,
    MatTableModule,
    
  ],
  declarations: [TarjetaPublicadorPage]
})
export class TarjetaPublicadorPageModule {}
