import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  x:string;
  y:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',x:"x",y:"y"},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',x:"x",y:"y"},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',x:"x",y:"y"},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',x:"x",y:"y"},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',x:"x",y:"y"},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',x:"x",y:"y"},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',x:"x",y:"y"},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',x:"x",y:"y"},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',x:"x",y:"y"},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',x:"x",y:"y"},
];




@Component({
  selector: 'app-agregar-informe',
  templateUrl: './agregar-informe.page.html',
  styleUrls: ['./agregar-informe.page.scss'],
  
})




export class AgregarInformePage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.wheelDate=new Date().toISOString();
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
  displayedColumns: string[] = [ 'name', 'weight', 'symbol',"x","y","comments"];
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
  name: string | undefined;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }




}
