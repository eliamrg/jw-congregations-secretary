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
      .then(response=>{
        console.log(response);
        this.router.navigate(['/informe']);
      })
      .catch(error=>{
          console.log(error);
          this.presentAlert('Error al Ingresar','Verificar sus datos',"Mensaje de error:" + "\n\n"+error);
      });
    
    
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
          this.Auth.SetFirestoreUser(this.id,this.name,this.email,"Email",0,false,false,[0]).then(()=>{
            //console.log('id:'+ this.id,this.name)
            this.setOpen(false);

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
