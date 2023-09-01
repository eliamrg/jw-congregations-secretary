import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private auth:AuthService, private router:Router) {this.loadUser(); }

  displayName:any;
  email:any;
  uid:any;
  isMensajeContrasenaOpen:boolean=false;
  
  ngOnInit() {

     this.loadUser();
    
  }

   loadUser(){
     this.auth.getUserEmail().then((email:any)=>{
      this.email=email;
    });
     this.auth.getUserName().then((name:any)=>{
      this.displayName=name;
    });
  }

  CambiarPassword(){
    this.isMensajeContrasenaOpen=true;
    console.log("Cambiar password: "+this.email)
    this.auth.cambioContrasena(this.email);
    //tconhis.isMensajeContrasenaOpen=true;
  }
  logOut(){
    this.auth.logout()
    .then(response=>{
      console.log(response);
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
        });
    })
    .catch(error=>console.log(error) )
  }
  cambiarDisplayName(){
    if (this.displayName.length>3){
      this.auth.changeDisplayName(this.displayName);
    }
    
  }
  

}
