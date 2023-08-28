import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  
  isAlertEliminarUserOpen: boolean=false;
  isAlertNoExisteAdmin: boolean=false;
  
  Users:any;
  Grupos:any;

  constructor(private auth: AuthService, private firestore:FirestoreService) { }
  ngOnInit() {
    this.auth.getUsers().then(users=>{
      this.Users=users;
      console.log(this.Users);
    })
    this.firestore.getGrupos().then(grupos=>{
      this.Grupos=grupos;
    })
  }


  handlerMessage = '';
  roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      cssClass: 'alert-button-cancel',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  setResult(ev:any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  }



  // admin.auth().deleteUser(uid)
  // .then(function() {
  //   console.log("Successfully deleted user");
  // })
  // .catch(function(error) {
  //   console.log("Error deleting user:", error);
  // });


  //ALERTS-------------------------------------------------------------
  alertEliminarUserShow(show:boolean, uid:any){

    this.isAlertEliminarUserOpen=show;
  }


  public alertButtonsEliminarUser = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.alertEliminarUserShow(false,0)
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        
      },
    },
  ];


  alertNoExisteAdminShow(show:boolean){

    this.isAlertNoExisteAdmin=show;
  }


  public alertButtonsNoExisteAdmin = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.alertNoExisteAdminShow(false)
        
      },
    },
    
  ];

  //POPOVER GRUPO----------------------------------------------------------------------------------------------
  handlerGrupoEncargadoChange(e:any, user:any) {
    let seleccion=e.detail.value;
    //console.log(e.detail.value)

    console.log(this.Users);
    this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,seleccion,user.admin,user.admited);
  }


  handelrCheckboxAdminChange(e:any,user:any,index:number){


    let permiso:boolean=e.currentTarget.checked;
    let existeUnAdmin=false;


    if (!user.administrador){
      this.Users.forEach((userDoc:any) => {

        //SI EXISTE UN ADMIN DIFERENTE AL QUE SE LE ESTAN QUITANDO PRIVILEGIOS
        if (userDoc.administrador && user.uid!=userDoc.uid){
          existeUnAdmin=true;
        }
        
      });
      if (existeUnAdmin){
        console.log("EXISTE OTRO ADMIN Y SE HACE CAMBIO");
        this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,permiso,user.admited);
      }
      else{
        console.log("No existe otro admin, no hay cambios");
        
        e.currentTarget.checked=true;
        this.alertNoExisteAdminShow(true);
      }
    }
    else{
      console.log("Se le da permisos");
      this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,permiso,user.admited);
    }
    // this.auth.existeAdministrador().then(existe=>{
    //   if(e.currentTarget.checked==true){
    //     this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,e.currentTarget.checked,user.admited);
    //   }
    //   else if(existe){
    //     this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,e.currentTarget.checked,user.admited);
    //   }
    //   else{

    //     this.alertNoExisteAdminShow(true);
    //   }
    // })
    
  }
  

}
