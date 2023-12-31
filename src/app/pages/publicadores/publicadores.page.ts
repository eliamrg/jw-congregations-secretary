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
  isAlertEncargadoOpen=false;
  isAlertAuxiliarOpen=false;
  publicadorEditar=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
  indexPubEditando=0;
  grupoEditando=0;
  
  mostrarValidacion=false;
  mostrarNacimientoDTP=false;
  mostrarBautismoDTP=false;
  mostrarfechaPublicadorDTP=false;
  
  bautismo:any;
  nacimiento:any;
  fechaPublicador:any



  constructor(private firestore: FirestoreService) { }

  async ngOnInit() {
    
    this.bautismo=new Date().toISOString();
    this.nacimiento=new Date().toISOString();
    this.fechaPublicador=new Date().toISOString();
    
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
        this.PublicadorAgregar.fechaPublicador=this.fechaPublicador
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
    this.fechaPublicador=this.PublicadorAgregar.fechaPublicador;
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
        this.PublicadoresPorGrupo[index].visible=false;
      });
      this.PublicadoresPorGrupo[seleccion].visible=true;
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
    //console.log(this.publicadorEditar)
    this.popover.event=e;
    this.isPopoverOpen=true;
    this.popoverPublicadorId=Pub.id;
    this.publicadorEditar=Pub;
    this.indexPubEditando=indexPub;
    console.log(this.publicadorEditar)
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
            idEncargado: 0,
            Publicadores:[],
            visible:true
          }
          this.GrupoConsecutivo=this.GrupoConsecutivo+1;
          this.PublicadoresPorGrupo.push(temp);
          console.log(this.PublicadoresPorGrupo);
          //window.location.reload();
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


 //ELIMINAR GRUPO------------------
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

///ELIMINAR GRUPO VALIDACION-------------------------------------------
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



  //CAMBIO DE ENCARGADO----------------------------------------------------------------------------------

  public alertButtonsEncargado = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: () => {
        //console.log(this.publicadorEditar.grupo,this.publicadorEditar.nombre,this.publicadorEditar.id,this.PublicadoresPorGrupo[this.publicadorEditar.grupo!]["Auxiliar"]|| "No Asignado")
        this.firestore.EditarGrupo(this.publicadorEditar.grupo,this.publicadorEditar.nombre,this.publicadorEditar.id,this.PublicadoresPorGrupo[this.publicadorEditar.grupo!]["Auxiliar"] || "No Asignado")
        this.PublicadoresPorGrupo[this.publicadorEditar.grupo!].Encargado=this.publicadorEditar.nombre;
        this.PublicadoresPorGrupo[this.publicadorEditar.grupo!].idEncargado=this.publicadorEditar.id;
      },
    },
  ];
  
  alertEncargadoShow(show:boolean){
    
    this.isAlertEncargadoOpen=show;

  }


   //CAMBIO DE AUXILIAR----------------------------------------------------------------------------------

   public alertButtonsAuxiliar = [
    {
      text: 'Aceptar',
      role: 'confirm',
      handler: async () => {
        let idEncargado=await this.PublicadoresPorGrupo[this.publicadorEditar.grupo!].idEncargado;
        let NombreEncargado=this.PublicadoresPorGrupo[this.publicadorEditar.grupo!]["Encargado"];
        //console.log(this.publicadorEditar.grupo,NombreEncargado,idEncargado,this.publicadorEditar.nombre)
        this.firestore.EditarGrupo(this.publicadorEditar.grupo,NombreEncargado,idEncargado,this.publicadorEditar.nombre)
        this.PublicadoresPorGrupo[this.publicadorEditar.grupo!].Auxiliar=this.publicadorEditar.nombre;
        
      },
    },
  ];
  
  alertAuxiliarShow(show:boolean){
    
    this.isAlertAuxiliarOpen=show;

  }


  // DATE PICKERS-----------------------------------------------------------------------------------
  MostrarFechaNac(vista:boolean){
    this.mostrarNacimientoDTP=vista;
  }
  MostrarFechaPub(vista:boolean){
    this.mostrarfechaPublicadorDTP=vista;
  }
  MostrarFechaBau(vista:boolean){
    this.mostrarBautismoDTP=vista;
  }

  
}
