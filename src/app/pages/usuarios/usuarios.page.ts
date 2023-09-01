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
  isAlertAdmitirUserOpen: boolean=false;
  isAlertNoExisteAdmin: boolean=false;
  isAlertValidacionEliminar: boolean=false;
  AlertMsg="Debe haber algun otro administrador";
  
  Users:any;
  UserEliminar:any; //Para almacenar los datos del user a Eliminar
  Grupos:any;
  UidAdmision:any; //Para saber cual user se admitira/eliminara
  indexAdmision:any; //Para hacer cambios localmente al array
  indexEliminar:any; //Para hacer cambios localmente al array


  constructor(private auth: AuthService, private firestore:FirestoreService) { }
  ngOnInit() {
    this.auth.getUsers().then(users=>{
      this.Users=users;
      //console.log(this.Users);
    })
    this.firestore.getGrupos().then(grupos=>{
      this.Grupos=grupos;
    })
  }

  handlerMessage = '';
  roleMessage = '';

  setResult(ev:any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  }

  //ALERTS-------------------------------------------------------------

  //ELIMINAR USER
  alertEliminarUserShow(show:boolean, user:any,index:any){

    this.isAlertEliminarUserOpen=show;
    this.indexEliminar=index;
    this.UserEliminar=user;
  }


  public alertButtonsEliminarUser = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.isAlertEliminarUserOpen=false;
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: async () => {

        let uid:any;
        let tempUsr=this.Users[this.indexEliminar];
        let existeUnAdmin=false;
        //console.log("index Eliminar:", this.indexEliminar)

        await this.auth.getUserId().then(async (CurrentUid:any)=>{

          uid=CurrentUid;
          this.AlertMsg="Debe haber algun otro administrador";

          this.Users.forEach((userDoc:any) => {

            //console.log(userDoc.uid)
            if (userDoc.administrador && uid!=this.UserEliminar.uid && userDoc.admited===true && userDoc.uid!=this.UserEliminar.uid){
                existeUnAdmin=true;
            }
    
            if (uid==this.UserEliminar.uid){
              this.AlertMsg="Estas intentando Eliminar tu propio Usuario, si deseas hacer esto pide a otro administrador que lo haga"
            }
          });

          if(existeUnAdmin){

            console.log("Existe admin")
            await this.auth.SetFirestoreUser(tempUsr.uid,tempUsr.displayName, tempUsr.email, tempUsr.loginProvider,tempUsr.grupo,tempUsr.administrador,false,tempUsr.grupos).then(()=>{
              this.Users[this.indexEliminar].admited=false;
            });
            
          }
          else{
            this.alertValidacionEliminarShow(true)
          }
          
        })
        this.isAlertEliminarUserOpen=false
        this.indexEliminar=0;
      
        
      },
    },
  ];

  //ADMITIR USER
  alertAdmitirUserShow(show:boolean, uid:any,index:any){

    this.isAlertAdmitirUserOpen=show;
    this.indexAdmision=index;
  }


  public alertButtonsAdmitirUser = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.isAlertAdmitirUserOpen=false;
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: async () => {
        let tempUsr=this.Users[this.indexAdmision];
        //console.log(tempUsr)
        await this.auth.SetFirestoreUser(tempUsr.uid,tempUsr.displayName, tempUsr.email, tempUsr.loginProvider,tempUsr.grupo,tempUsr.administrador,true,tempUsr.grupos).then(()=>{
          this.Users[this.indexAdmision].admited=true;
        });
        this.isAlertAdmitirUserOpen=false;
        this.indexAdmision=0;
        
      },
    },
  ];

//NO EXISTE ADMIN (Cuando se retiran privilegios del mismo user o no hay mas admins)
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

//VALIDACION ELIMINAR (Cuando es el mismo user o solo hay un user)

  alertValidacionEliminarShow(show:boolean){

    this.isAlertValidacionEliminar=show;
  }


  public alertButtonsValidacionEliminar = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.alertValidacionEliminarShow(false)
        
      },
    },
    
  ];

  //POPOVER GRUPO----------------------------------------------------------------------------------------------
  handlerGrupoEncargadoChange(e:any, user:any) {
    let Grupo=e.detail.value;
    //console.log(e.detail.value)

    console.log(this.Users);
    this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,Grupo,user.administrador,user.admited,user.grupos);
  }


  async handelrCheckboxAdminChange(e:any,user:any,index:number){

    this.AlertMsg="Debe haber algun otro administrador";
    let permiso:boolean=e.currentTarget.checked;
    let existeUnAdmin=false;
    let uid:any="";
    

    
    await this.auth.getUserId().then((CurrentUid:any)=>{

      uid=CurrentUid;
    })

    if(permiso){
      //console.log("Se le da permisos");
      this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,true,user.admited, user.grupos).then(()=>{
        //e.currentTarget.checked=true;
        this.Users[index].administrador=true;
      });
      
    }
    else{
      //SI EXISTE UN ADMIN DIFERENTE AL USUARIO
      this.Users.forEach((userDoc:any) => {

        //console.log(userDoc.uid)
        if (userDoc.administrador && uid!=user.uid){
            existeUnAdmin=true;
        }

        if (uid==user.uid){
          this.AlertMsg="No es posible retirar permisos propios, si deseas hacer esto pide a otro administrador que lo haga"
        }
      });

      if(existeUnAdmin){
        //console.log("EXISTE OTRO ADMIN Y SE HACE CAMBIO");
        
        this.auth.SetFirestoreUser(user.uid,user.displayName, user.email, user.loginProvider,user.grupo,false,user.admited,user.grupos).then(()=>{
          this.Users[index].administrador=false;
        });
      }
      else{
        //console.log("No existe otro admin, no hay cambios");
        
        e.currentTarget.checked=true;
        this.Users[index].administrador=true;
        this.alertNoExisteAdminShow(true);
      }
    }
  }
  
}
