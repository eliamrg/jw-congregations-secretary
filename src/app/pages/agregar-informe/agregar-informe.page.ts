import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


export interface PeriodicElement {
  nombre: string;
  position: number;
  horas: number;
  publicaciones:number
  videos: number;
  revisitas:number;
  cursos:number;
  observacion:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, nombre: 'Santiago Eliam Ramirez Garcia', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10,observacion:""},
  {position: 2, nombre: 'Eliezer Cruz Del Angel', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 3, nombre: 'Rolando Ramirez Hernandez', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 4, nombre: 'Angel Antonio Garza', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 5, nombre: 'Eber Daniel Carrizales Jacobo', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 6, nombre: 'Jaziel Cisneros Gallegos', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 7, nombre: 'Jesus Beningno Vera', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 8, nombre: 'Miguel Nuñez Soriano', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 9, nombre: 'Brayan Gutierrez Covarrubias', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
  {position: 10, nombre: 'Gumercindo Nuñez ApellidoM', horas: 10, publicaciones: 10,videos: 10, revisitas: 10, cursos: 10, observacion:""},
];




@Component({
  selector: 'app-agregar-informe',
  templateUrl: './agregar-informe.page.html',
  styleUrls: ['./agregar-informe.page.scss'],
  
})




export class AgregarInformePage implements OnInit {

  constructor() { }

  ngOnInit() {
    var today=new Date();
    var currentMonth=today.getMonth();
    today.setMonth(today.getMonth()-1);
    this.wheelDate=today.toISOString();
    this.showdate();
  }


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


  //TABLE
  displayedColumns: string[] = [ 'nombre', 'horas', 'publicaciones',"videos","revisitas","cursos","observaciones"];
  dataSource = ELEMENT_DATA;




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




}
