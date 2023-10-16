import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { informe } from 'src/app/Classes/informe';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';
import { ReportesService } from 'src/app/services/Reportes/reportes.service';

@Component({
  selector: 'app-agregar-informe',
  templateUrl: './agregar-informe.page.html',
  styleUrls: ['./agregar-informe.page.scss'],
  
})

export class AgregarInformePage implements OnInit {

  constructor(private firestore: FirestoreService,private loadingCtrl: LoadingController, private reporteService:ReportesService) { }

  InformesPorGrupo:any;
  SelectedMonth:any;
  SelectedYear:any;
  userPrivs:any

  ReporteInforme:any;

  ReporteGenerado=false;
  

  async ngOnInit() {
    
    var today=new Date();
    this.SelectedMonth=today.getMonth();
    this.SelectedYear=today.getFullYear();
    today.setMonth(today.getMonth()-1);
    this.wheelDate=today.toISOString();
    this.showdate();//AQUI SE CARGAN INFORMES

    this.userPrivs = JSON.parse(localStorage.getItem("userData")!);
    
    
  }

  async ObtenerInformesDeFecha(){
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Informes...',
      duration:1500
    });
    loading.present();

    await this.firestore.getInformeMes(this.SelectedYear,this.SelectedMonth).then(x=>{
      //console.log(x)
      this.InformesPorGrupo=x;
      
    })
    
    
  }

  async GuardarInforme(Grupo:any){
    const loadingiNFORME = await this.loadingCtrl.create({
      message: 'Guardando Informes...',
      duration:1200
    });
    loadingiNFORME.present();
    let InformesGrupoSeleccionado=this.InformesPorGrupo[Number(Grupo)].Publicadores;
    InformesGrupoSeleccionado.forEach(async (publicador:any) => {
      let temp= publicador.informe;
      console.log(this.SelectedYear,this.SelectedMonth,temp);


      await this.firestore.setInformeMes(this.SelectedYear,this.SelectedMonth,temp,temp.idPublicador)
    });
    
  }



  //DATEPICKER
  stringDate:any;
  wheelDate:any;
  showdate(){
    let date=new Date(this.wheelDate);
    let month=date.getMonth() +1;
    this.SelectedMonth=month;
    
    let year=date.getFullYear();
    this.SelectedYear=year;
    let stringMonth=this.getMonthName(month);
    
    this.stringDate=(stringMonth + " " + year);
    //this.weeks=this.getWeeksInMonth(year,month-1 );
    //var date=this.wheelDate.getDate();
    this.ObtenerInformesDeFecha();
    
    
  }

  getMonthName(monthNumber:number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-MX', { month: 'long' });
  }




  //MODAL DATE
  @ViewChild(IonModal)
  modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  nombre: string | undefined;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.nombre, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  handlerVerGrupoChange(e:any) {
    let seleccion=e.detail.value;

    if(seleccion=='Todos'){
      if (this.userPrivs.administrador){
        this.InformesPorGrupo.forEach((element: any,index:number) => {
          // console.log(index,element);
          this.InformesPorGrupo[index].visible=true;
        });
      }
      else{
        this.InformesPorGrupo.forEach((element: any,index:number) => {
          if(index!=0){
            //console.log(index,element);
            this.InformesPorGrupo[index].visible=this.userPrivs.grupos.includes(index.toString());
          }
        });
      }
      
    }
    else{
      
      this.InformesPorGrupo.forEach((element: any,index:number) => {
        // console.log(index,element);
        this.InformesPorGrupo[index].visible=false;
      });
      this.InformesPorGrupo[seleccion].visible=true;
    }
  }

  GenerarReporte(){
    this.ReporteInforme=this.reporteService.ReporteInformes(this.InformesPorGrupo)
    console.log(this.ReporteInforme)

    this.ReporteGenerado=true;
    }
 

  

}
