import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acomodadores',
  templateUrl: './acomodadores.page.html',
  styleUrls: ['./acomodadores.page.scss'],
})
export class AcomodadoresPage implements OnInit {

  public nombres = [
    "Gamaliel Orozco",
    "Antonio Garza",
    "Santiago Ramirez",
    "Jaziel Cisneros",
    "Carlos Gallegos",
    "Mario Trujillo",
    "Eliud Cardenas",
    "Juan Guardiola",
    "Yair Cisneros",
    "Francisco Melchor",
    "Samuel Delgado",
    "Adrian Hernandez",
    "Juan Crispin Canales",
    "Alan Silva",
    "Gonzalo Urbina",
    "Jose Vaquera",
    "Diego Ramirez",
    "Rolando Ramirez",
    "Gerardo Martinez",
    "Marco Gutierrez",
    "Jesus Benigno Vera",
    "Martin Rodarte",
    "Alexis Martinez",
    "Federico Camargo",
    "Joel Núñez",
    "Eber Carrizales",
    "Eliezer Cruz",
    "Asahel Ortega",
    "Francisco Monsivais",
    "Artemio Silva",
    "Bertin Nagera",
    "Gumercindo Núñez"
  ];

  public programa = [
    {
      fecha: 'Miercoles 3',
      presidente: '',
      vigilancia: [],
      vestibulo: '',
      acomodadores: [],
      lectura: ''
    },
    {
      fecha: 'Sabado 6',
      presidente: '',
      vigilancia: [],
      vestibulo: '',
      acomodadores: [],
      lectura: ''
    },
    // Añade más filas según sea necesario
  ];

  constructor() { }

  ngOnInit() {
  }
  

}
