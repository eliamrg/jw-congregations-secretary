import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { informe } from 'src/app/Classes/informe';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';





// const ELEMENT_DATA: informe[] = [
//   {position: 1, nombre: 'Santiago Eliam Ramirez Garcia', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null,observacion:"", grupo:0},
//   {position: 2, nombre: 'Eliezer Cruz Del Angel', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 3, nombre: 'Rolando Ramirez Hernandez', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 4, nombre: 'Angel Antonio Garza', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 5, nombre: 'Eber Daniel Carrizales Jacobo', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 6, nombre: 'Jaziel Cisneros Gallegos', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 7, nombre: 'Jesus Beningno Vera', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 8, nombre: 'Miguel Nuñez Soriano', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 9, nombre: 'Brayan Gutierrez Covarrubias', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
//   {position: 10, nombre: 'Gumercindo Nuñez ApellidoM', horas: null, publicaciones: null,videos: null, revisitas: null, cursos: null, observacion:"", grupo:0},
// ];




@Component({
  selector: 'app-agregar-informe',
  templateUrl: './agregar-informe.page.html',
  styleUrls: ['./agregar-informe.page.scss'],
  
})




export class AgregarInformePage implements OnInit {

  constructor(private firestore: FirestoreService) { }

  InformesPorGrupo:any;
 
  


 
  async ngOnInit() {
    await this.firestore.getInformeMes().then(x=>{
      console.log(x)
      this.InformesPorGrupo=x;
    })
    var today=new Date();
    var currentMonth=today.getMonth();
    today.setMonth(today.getMonth()-1);
    this.wheelDate=today.toISOString();
    this.showdate();
  }





  //TABLE
  // displayedColumns: string[] = [ 'nombre', 'horas', 'publicaciones',"videos","revisitas","cursos","observaciones"];
  // dataSource = ELEMENT_DATA;




  //DATEPICKER
  stringDate:any;
  wheelDate:any;
  showdate(){
    let date=new Date(this.wheelDate);
    let month=date.getMonth() +1;
    let year=date.getFullYear();
    let stringMonth=this.getMonthName(month);
    
    this.stringDate=(stringMonth + " " + year);
    //this.weeks=this.getWeeksInMonth(year,month-1 );
    //var date=this.wheelDate.getDate();
    
    
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
      this.InformesPorGrupo.forEach((element: any,index:number) => {
        // console.log(index,element);
        this.InformesPorGrupo[index].visible=true;
      });
    }
    else{
      this.InformesPorGrupo.forEach((element: any,index:number) => {
        // console.log(index,element);
        this.InformesPorGrupo[index].visible=false;
      });
      this.InformesPorGrupo[seleccion].visible=true;
    }
  }



}
