import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarInformePageRoutingModule } from './agregar-informe-routing.module';

import { AgregarInformePage } from './agregar-informe.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarInformePageRoutingModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AgregarInformePage]
})
export class AgregarInformePageModule {}
