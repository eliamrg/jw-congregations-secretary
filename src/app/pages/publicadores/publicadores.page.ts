import { Component, OnInit, ViewChild } from '@angular/core';
import { publicador } from 'src/app/Classes/publicador';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.page.html',
  styleUrls: ['./publicadores.page.scss'],
})
export class PublicadoresPage implements OnInit {

  PublicadorAgregar:publicador=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
  GrupoConsecutivo:any;
  PublicadoresPorGrupo:any;
  bautizado=false;

  isEditing=false;
  isAlertEliminarGrupoOpen=false;
  isAlertEliminarPublicadorOpen=false;
  isAlertEliminarGrupoValidacionOpen=false;
  publicadorEditar=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
  indexPubEditando=0;
  
  mostrarValidacion=false;
  mostrarNacimientoDTP=false;
  mostrarBautismoDTP=false;
  
  bautismo:any;
  nacimiento:any;



  constructor(private firestore: FirestoreService) { }

  async ngOnInit() {
    
    this.bautismo=new Date().toISOString();
    this.nacimiento=new Date().toISOString();
    
    await this.firestore.getPublicadoresPorGrupo().then(PUBS=>{
      this.PublicadoresPorGrupo=PUBS;
    });
    
    console.log(this.PublicadoresPorGrupo)
    this.GrupoConsecutivo=Object.keys(this.PublicadoresPorGrupo).length;
  }


  //CREAR PUBLICADOR---------------------------------------------------------------------------------------------
  CrearPublicador(){
    //CREACION DE ID
    if(this.PublicadorAgregar.nombre!=""){
      let today : string=new Date().toLocaleDateString().split('/').join('');
      let CustomId=this.PublicadorAgregar.nombre.split(' ')[0]+'-'+this.PublicadorAgregar.nombre.split(' ').pop() +'-'+today+'-'+ this.firestore.getRandomNumber(0,999999);
      this.PublicadorAgregar.id=CustomId;
      this.guardarPublicador();
    }
  }

  EditarPublicador(){
    if(this.PublicadorAgregar.nombre!=""){
      this.PublicadoresPorGrupo[this.publicadorEditar.grupo!]["Publicadores"].splice(this.indexPubEditando, 1);
      this.guardarPublicador();
    }
  }

   guardarPublicador(){
    
     try{
        this.PublicadorAgregar.grupo=this.grupoAgregarPublicador;

        this.PublicadorAgregar.nacimiento=this.nacimiento;
        this.PublicadorAgregar.bautismo=this.bautismo;
        console.log(this.PublicadorAgregar)
        this.firestore.CrearPublicador(this.PublicadorAgregar).then(()=>{
        this.mostrarValidacion=false;
        this.isModalOpen=false;
        this.PublicadoresPorGrupo[this.PublicadorAgregar.grupo!]["Publicadores"].push(this.firestore.mapPublicador(this.PublicadorAgregar))
        //console.log(this.PublicadoresPorGrupo);
        this.PublicadorAgregar=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
        this.publicadorEditar=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
        this.isEditing=false;
      });
     } 
     catch (er:any){
      console.log(er);
     }
  }

  

  
  
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

  PresentEditarPublicador(){
    
    this.isModalOpen = true;
    this.isEditing=true;
    this.PublicadorAgregar=this.publicadorEditar;
    this.nacimiento=this.PublicadorAgregar.nacimiento;
    this.grupoAgregarPublicador=this.PublicadorAgregar.grupo!;
  }

  handlePublicadorGrupoChange(e:any) {
    this.grupoAgregarPublicador=e.detail.value;
  }

  handlerVerGrupoChange(e:any) {
    let seleccion=e.detail.value;

    if(seleccion=='Todos'){
      this.PublicadoresPorGrupo.forEach((element: any,index:number) => {
        // console.log(index,element);
        this.PublicadoresPorGrupo[index].visible=true;
      });
    }
    else{
      this.PublicadoresPorGrupo.forEach((element: any,index:number) => {
        // console.log(index,element);
        this.PublicadoresPorGrupo[e.detail.value].visible=true;
        if(e.detail.value!=element.grupo){
          this.PublicadoresPorGrupo[index].visible=false;

        }
      });
    }
  }
  
  onWillDismiss(event: Event) {
   
    this.isModalOpen=false;
  }


  //POPOVER------------------------------------------------------------------------------
@ViewChild('popover') popover: any;
isPopoverOpen=false;

popoverPublicadorId:any;

  presentPopover(e:Event,Pub:publicador,indexPub:number){
    this.popover.event=e;
    this.isPopoverOpen=true;
    this.popoverPublicadorId=Pub.id;
    this.publicadorEditar=Pub;
    this.indexPubEditando=indexPub;
    //console.log(Pub)
  }

  
   
  //ALERT---------------------------------------------------------------------------------
  
  
  public alertButtons = [
    
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('cancel');
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        //console.log('Creando grupo'+ Object.keys(this.PublicadoresPorGrupo).length);
        this.firestore.CrearGrupo(this.GrupoConsecutivo.toString()).then(()=>{
          let temp={
            id:this.GrupoConsecutivo,
            Encargado: "No Asignado",
            IdEncargado: 0,
            Publicadores:[]
          }
          this.GrupoConsecutivo=this.GrupoConsecutivo+1;
          this.PublicadoresPorGrupo.push(temp);
          console.log(this.PublicadoresPorGrupo);
          window.location.reload();
        });
      },
    },
  ];


  public alertButtonsEliminarPublicador = [
    
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.alertEliminarPublicadorShow(false)
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        this.PublicadoresPorGrupo[this.publicadorEditar.grupo!]["Publicadores"].splice(this.indexPubEditando, 1);
        this.firestore.BorrarPublicador(this.publicadorEditar.id)
      },
    },
  ];
  
  alertEliminarPublicadorShow(show:boolean){

    this.isAlertEliminarPublicadorOpen=show;
  }



  public alertButtonsEliminarGrupo = [
    
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        this.alertEliminarGrupoShow(false)
      },
    },
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        // 
        if(this.PublicadoresPorGrupo[this.GrupoConsecutivo-1]["Publicadores"].length>0){

          this.alertEliminarGrupoValidacionShow(true);
        }
        else{
          this.firestore.BorrarGrupo((this.GrupoConsecutivo-1).toString()).then(()=>{
            this.PublicadoresPorGrupo.pop();
            this.GrupoConsecutivo=this.GrupoConsecutivo-1;
            //window.location.reload();
          });
          
        }
        
      },
    },
  ];
  
  alertEliminarGrupoShow(show:boolean){

    this.isAlertEliminarGrupoOpen=show;
  }


  public alertButtonsEliminarGrupoValidacion = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        
      },
    },
  ];
  
  alertEliminarGrupoValidacionShow(show:boolean){

    this.isAlertEliminarGrupoValidacionOpen=show;
  }

  // DATE PICKERS-----------------------------------------------------------------------------------
  MostrarFechaNac(vista:boolean){
    this.mostrarNacimientoDTP=vista;
  }
  MostrarFechaBau(vista:boolean){
    this.mostrarBautismoDTP=vista;
  }

  
}
