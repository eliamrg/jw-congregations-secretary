import { Component, OnInit } from '@angular/core';
import { informe } from 'src/app/Classes/informe';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

 


@Component({
  selector: 'app-tabla-informe',
  templateUrl: './tabla-informe.component.html',
  styleUrls: ['./tabla-informe.component.scss'],
})
export class TablaInformeComponent  implements OnInit {


  // TablaInfo: informe[] = [
  //   {position: 1, nombre: 'Santiago Eliam Ramirez Garcia', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10,observacion:"Observacion x", grupo:0},
  //   {position: 2, nombre: 'Eliezer Cruz Del Angel', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 3, nombre: 'Rolando Ramirez Hernandez', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"  Obs", grupo:0},
  //   {position: 4, nombre: 'Angel Antonio Garza', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 5, nombre: 'Eber Daniel Carrizales Jacobo', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 6, nombre: 'Jaziel Cisneros Gallegos', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 7, nombre: 'Jesus Beningno Vera', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 8, nombre: 'Miguel Nuñez Soriano', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 9, nombre: 'Brayan Gutierrez Covarrubias', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  //   {position: 10, nombre: 'Gumercindo Nuñez ApellidoM', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:"", grupo:0},
  // ];
  

  constructor() { }

  ngOnInit() {

    
    
  }


  
}
