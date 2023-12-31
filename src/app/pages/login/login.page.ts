import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { AlertController } from '@ionic/angular';
import { getAuth, updateProfile } from '@angular/fire/auth';
//import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


 constructor( private loadingCtrl: LoadingController, private router:Router, private Auth:AuthService,private alertController: AlertController){}
  

  name!: string;
  email!: string;
  Password1!: string;
  Password2!: string;
  id!:any;
  formLogin!: FormGroup;
  formRegister!: FormGroup;
  isModalContrasenaOpen=false;
  CorreoCambiarContrasena="";
  IsCorreoEnviado=false;
  
  // constructor(private userService: UserService, private router:Router) { }

  ngOnInit() {
    this.formLogin=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })

    this.formRegister=new FormGroup({
      email:new FormControl('',[Validators.required, Validators.minLength(5)]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    })
  }

  setName($event: any) {
    this.name = $event.target.value;
  }
  
  setEmail($event: any) {
    this.email = $event.target.value;
  }

  setPassword1($event: any) {
    this.Password1 = $event.target.value;
  }
  setPassword2($event: any) {
    this.Password2 = $event.target.value;
  }
  
  login(){
    this.showLoading();
    this.Auth.login(this.formLogin.value)
      .then(async response=>{
        console.log(response);
        let user:any;
        let uid:any
       
        await this.Auth.initialize();
        await this.Auth.getUserId().then(async uidDoc=>{
          uid=uidDoc;
        
        })
        await this.Auth.getFirestoreUser(uid).then((userDoc:any)=>{
          user=userDoc;
         
        })

        localStorage.setItem("userData", JSON.stringify(user));
        this.router.navigate(['/informe']);
      })
      .catch(error=>{
          console.log(error);
          this.presentAlert('Error al Ingresar','Verificar sus datos',"Mensaje de error:" + "\n\n"+error);
      });
    
    
  }

  async CambiarContrasena(){
    if (this.CorreoCambiarContrasena!=null && this.CorreoCambiarContrasena!=undefined && this.CorreoCambiarContrasena.length>5){

      await this.Auth.cambioContrasena(this.CorreoCambiarContrasena).then(()=>{
        this.IsCorreoEnviado=true;
      })
      
      // this.Auth.cambioContrasena(this.CorreoCambiarContrasena).then(()=>{
      //   this.IsCorreoEnviado=true;
      // }).catch((error: any)=>{
      //   this.presentAlert('Error al Cambiar Contraseña','Verificar que su correo sea correcto',"Mensaje de error:" + "\n\n"+error);
      //   });
      
    }

  }
  AbrirModalCambiarContrasena(abrir:boolean){
    this.CorreoCambiarContrasena="";
    this.isModalContrasenaOpen=abrir;
    this.IsCorreoEnviado=false;
  }


  register(){
    
    if(this.Password1!==this.Password2){
      this.presentAlert('Error al Regisrarse','Las contraseñas no coiniciden',"Intenta de nuevo");
    }
    else{

      this.showLoading();

      //REGISTRO DE USUARIO EN FIREBASE AUTH
      this.Auth.register(this.formRegister.value)
      .then(response=>{
        console.log(response);

        let auth :any;
        auth= getAuth();

        //ESTABLECIMIENTO DE NOMBRE
        updateProfile(auth.currentUser, {
          displayName:this.name
          
        })
        .then(async () => {
          
          
          this.id= await this.Auth.getUserId()!;

          //console.log(this.name, this.id,this.email,)

          //CREACION DE USUARIO EN FIRESTORE
          this.Auth.SetFirestoreUser(this.id,this.name,this.email,"Email",0,false,false,[0]).then(async ()=>{
            //console.log('id:'+ this.id,this.name)
            this.setOpen(false);


            let user:any;
          let uid:any
        
          await this.Auth.initialize();
          await this.Auth.getUserId().then(async uidDoc=>{
            uid=uidDoc;
          
          })
          await this.Auth.getFirestoreUser(uid).then((userDoc:any)=>{
            user=userDoc;
          
          })

          localStorage.setItem("userData", JSON.stringify(user));

              this.router.navigate(['/configuracion']).then(() => {
              // window.location.reload();
              });
            });
          
          })
          .catch(error=>{
            console.log(error);
            this.presentAlert('Error al Registrarse','Verificar sus datos',"Mensaje de error:" + "\n\n"+error);
          });
  
      })
      .catch(error=>{
        console.log(error);
        this.presentAlert('Error al Registrarse','Verificar sus datos',"Mensaje de error:" + "\n\n"+error);
      });
    }
    
  }

  loginGoogle(){
    this.Auth.loginWithGoogle()
    .then(response=>{
      console.log(response);
      this.router.navigate(['/informe']);
    })
    
  }
  

  async presentAlert(header:string,subheader:string,message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message:  message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 1000,
    });

    loading.present();
  }



  //modal
  @ViewChild(IonModal) modal: IonModal | any;

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
