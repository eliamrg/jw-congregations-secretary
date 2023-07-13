import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    //{ title: 'Estadísitcas', url: '/folder/Estadisticas', icon: 'bar-chart' },
    { title: 'Informes de Predicación', url: '/informe', icon: 'newspaper' },
    //{ title: 'Precursores Regulares', url: '/folder/Regulares', icon: 'person-add' },
    //{ title: 'Precursores Auxiliares', url: '/folder/Auxiliares', icon: 'person' },
    { title: 'Asistencia a Reuniones', url: '/asistencia', icon: 'people' },
    { title: 'Publicadores', url: '/publicadores', icon: 'man' },
    // { title: 'tarjeta', url: '/publicador', icon: 'star' },
  ];
  public reportes = ['Precursores Regulares', 'Precursores Auxiliares', 'Publicadores', 'Asistencia'];
  constructor() {}
}
