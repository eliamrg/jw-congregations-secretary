import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.page.html',
  styleUrls: ['./publicadores.page.scss'],
})
export class PublicadoresPage implements OnInit {


  PublicadoresPorGrupo:any;
  constructor(private firestore: FirestoreService,private alertController: AlertController) { }

  async ngOnInit() {
    await this.firestore.getPublicadoresPorGrupo().then(X=>{
      this.PublicadoresPorGrupo=X;
    });
    console.log(this.PublicadoresPorGrupo)
    this.randomNumber= Math.floor(Math.random() * 999999);
  }

  // async LoadPublicadores(){

    

  //   this.firestore.getPublicadoresPorGrupo();
  //   // this.firestore.prueba();
  //   // let snapshot= await this.firestore.getPublicadores().then(x=>{
      
      
  //   // });
    
  //   // let query= await this.firestore.getPublicadores().then(x=>{
      
  //   //   console.log(x.)
      
  //   //   });
  //   // console.log(snapshot.)
  // }

  randomNumber!: number;
  Grupos=[
    {"id":1,
      "Publicadores":[
        {"id":"p1",
          "privilegio": "Anciano"
        },
        {"id":"p2",
        "privilegio": "Siervo Ministerial"
        },
        
        {"id":"p3",
        "privilegio": "Precursor Regular"
        },
        {"id":"p4",
        "privilegio": "Publicador"
        },
      ]
    },
    {"id":2,
    "Publicadores":[
      {"id":"p5",
      "privilegio": "Anciano"
    },
      {"id":"p6"},
      {"id":"p7"}
    ]
    },
    {"id":3,
    "Publicadores":[
      {"id":"p7",
      "privilegio": "Anciano"
    },
      {"id":"p8"},
      {"id":"p9"}
    ]
    },
    {"id":4},
    {"id":5},
    {"id":6},
    {"id":7},
    {"id":8},
    {"id":9},
    {"id":10},
    {"id":11},
    {"id":12},
  ]


  bautizado=false;
  
//MODAL------------------------------------------------------------------------------------------------------------------
  grupoAgregarPublicador=0;
  canDismiss=false;

  isModalOpen = false;

  setOpen(isOpen: boolean,grupo:number) {
    // if(isOpen==true)
    //   this.canDismiss=true;
    this.grupoAgregarPublicador=grupo;
    this.isModalOpen = isOpen;
  }

  
  onWillDismiss(event: Event) {
   
    this.isModalOpen=false;
  }


  //POPOVER------------------------------------------------------------------------------
@ViewChild('popover') popover: any;
isPopoverOpen=false;

popoverPublicadorId=0;;

  presentPopover(e:Event,publicdorId:number){
    this.popover.event=e;
    this.isPopoverOpen=true;
    this.popoverPublicadorId=publicdorId
  }


   alertInputs = [
    {
      placeholder: 'Encargado (Etiqueta Temporal)',
    }]
  //ALERT---------------------------------------------------------------------------------
  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: '¿Seguro que desea crear un Nuevo Grupo?',
      header: 'Nuevo Grupo: '+Object.keys(this.PublicadoresPorGrupo).length,
      
      buttons: ['OK','Cancel'],
      
    });

    await alert.present();
  }
  
}
