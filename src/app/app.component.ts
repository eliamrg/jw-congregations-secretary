import { Component } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private Auth: AuthService, private router: Router) {}

  //userLogged=this.AAuth.getUserLogged();
  public appPages = [
    
    { title: 'Informes de Predicación', url: '/informe', icon: 'newspaper' },
    { title: 'Asistencia a Reuniones', url: '/asistencia', icon: 'people' },
    { title: 'Publicadores', url: '/publicadores', icon: 'briefcase' },
    { title: 'Administrar Usuarios', url: '/usuarios', icon: 'person-circle' },
    { title: 'Configuración', url: '/configuracion', icon: 'settings' },
    
  ];


  public appReports = [
    
    { title: 'Precursores Regulares', url: '/reporte-regular', icon: 'star' },
    { title: 'Precursores Auxiliares', url: '/reporte-auxiliar', icon: 'person-add' },
    { title: 'Publicadores', url: '/reporte-publicador', icon: 'person' },
    { title: 'Asistencia', url: 'reporte-asistencia', icon: 'people' },
    
  ];
  public reportes = ['Precursores Regulares', 'Precursores Auxiliares', 'Publicadores', 'Asistencia'];
  

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
