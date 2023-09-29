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
  ngOnInit(): void {
    this.data = localStorage.getItem("userData");
    // console.log("data: ", JSON.parse(this.data));
  }
  constructor(private Auth: AuthService, private router: Router) {}

  //userLogged=this.AAuth.getUserLogged();
  public appPages = [
    
    { title: 'Informes de Predicación', url: '/informe', icon: 'newspaper', condicion:true },
    { title: 'Asistencia a Reuniones', url: '/asistencia', icon: 'people', condicion:this.data.administrador},
    { title: 'Publicadores', url: '/publicadores', icon: 'man' },
    { title: 'Administrar Usuarios', url: '/usuarios', icon: 'person-circle' },
    { title: 'Configuración', url: '/configuracion', icon: 'settings' },
    //{ title: 'Emergencia', url: '/emergencia', icon: 'alert-circle' },
    
  ];


  public appReports = [
    
    { title: 'Predicación', url: '/reporte-predicacion', icon: 'briefcase' },
    { title: 'Infrome Anual', url: '/informe-anual', icon: 'bar-chart' },
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
