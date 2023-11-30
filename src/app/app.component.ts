import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  data:any={};
  userPrivs:any;
  isAdmin:any=true;
  ngOnInit(): void {
    // this.userPrivs = JSON.parse(localStorage.getItem("userData")!);
    // this.isAdmin=this.userPrivs.administrador;
    
  }
  constructor(private Auth: AuthService, private router: Router) {}

  //userLogged=this.AAuth.getUserLogged();
  public appPages = [
    //condicion:JSON.parse(localStorage.getItem("userData")!).administrador
    { title: 'Informes de Predicación', url: '/informe', icon: 'newspaper', condicion:true },
    { title: 'Asistencia a Reuniones', url: '/asistencia', icon: 'people', condicion: true},
    { title: 'Publicadores', url: '/publicadores', icon: 'man' , condicion: true},
    { title: 'Administrar Usuarios', url: '/usuarios', icon: 'person-circle', condicion: true },
    { title: 'Configuración', url: '/configuracion', icon: 'settings',condicion:true },
    //{ title: 'Emergencia', url: '/emergencia', icon: 'alert-circle' },
    
  ];


  public appReports = [
    { title: 'Info. Contacto', url: '/publicadores-contacto', icon: 'man',condicion: true },
    { title: 'Informe para Visita', url: '/predicacion-visita', icon: 'briefcase',condicion: true },
    { title: 'Predicación Mensual (desarrollo)', url: '/reporte-predicacion', icon: 'briefcase',condicion: true },
    { title: 'Infrome Anual (desarrollo)', url: '/informe-anual', icon: 'bar-chart',condicion: true },
    { title: 'Asistencia(desarrollo)', url: 'reporte-asistencia', icon: 'people',condicion: true},
    
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
