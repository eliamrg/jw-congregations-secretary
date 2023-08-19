import { Component } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';
import { Router } from '@angular/router';
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
    { title: 'Publicadores', url: '/publicadores', icon: 'briefcase' },
    { title: 'Administrar Usuarios', url: '/usuarios', icon: 'person-circle' },
    
  ];


  public appReports = [
    //{ title: 'Estadísitcas', url: '/folder/Estadisticas', icon: 'bar-chart' },
    { title: 'Precursores Regulares', url: '/reporte-regular', icon: 'star' },
    //{ title: 'Precursores Regulares', url: '/folder/Regulares', icon: 'person-add' },
    //{ title: 'Precursores Auxiliares', url: '/folder/Auxiliares', icon: 'person' },
    { title: 'Precursores Auxiliares', url: '/reporte-auxiliar', icon: 'person-add' },
    { title: 'Publicadores', url: '/reporte-publicador', icon: 'person' },
    { title: 'Asistencia', url: 'reporte-asistencia', icon: 'people' },
    
  ];
  public reportes = ['Precursores Regulares', 'Precursores Auxiliares', 'Publicadores', 'Asistencia'];
  constructor(private Auth: AuthService, private router: Router) {}

  logOut(){

    this.Auth.logout()
    .then(response=>{
      console.log(response);
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
        });
    })
    .catch(error=>console.log(error) )
  }
}
