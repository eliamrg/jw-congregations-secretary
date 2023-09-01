import { Component, OnInit,  ViewChild } from '@angular/core';
import { IonModal, MenuController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-audio-video',
  templateUrl: './audio-video.page.html',
  styleUrls: ['./audio-video.page.scss'],
})
export class AudioVideoPage implements OnInit {


  print=false;
  encargados=[
    // "Gamaliel Orozco",
    "Antonio Garza",
    "Santiago Ramirez",
    "Jaziel Cisneros",
    "Carlos Gallegos",
  ]

  weeks: { 
    start: number; 
    end: number; 
    audio1:string | undefined; 
    audio2:string| undefined;
    video1:string | undefined;
    video2:string | undefined;
    plataforma1:string | undefined;
    plataforma2:string | undefined;
  }[] | undefined;

  constructor( public menuCtrl: MenuController) { }
  wheelDate:any;
  stringDate:any;
  

  ngOnInit() {

    this.wheelDate=new Date().toISOString();
    this.showdate();
    //this.weeks=this.getWeeksInMonth(2023,6);

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }


  //DATEPICKER
  showdate(){
    let date=new Date(this.wheelDate);
    let month=date.getMonth() +1;
    let year=date.getFullYear();
    let stringMonth=this.getMonthName(month);
    
    this.stringDate=(stringMonth + " " + year);
    this.weeks=this.getWeeksInMonth(year,month-1 );
    //var date=this.wheelDate.getDate();
    
    
  }

  getWeeksInMonth(year:number, month:number) {
    //EL RANGO DE MESES ES DE 0 A 11 
    var d = new Date(year,month,1),
        weeks = [];

    // Get the first Monday in the month
    while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {



      let a1:any,a2:any,v1:any,v2:any,p1:any,p2:any;
    do{
      a1= this.encargados[Math.floor(Math.random() * this.encargados.length)];
      v1= this.encargados[Math.floor(Math.random() * this.encargados.length)];
      p1= this.encargados[Math.floor(Math.random() * this.encargados.length)];
      a2= this.encargados[Math.floor(Math.random() * this.encargados.length)];
      v2= this.encargados[Math.floor(Math.random() * this.encargados.length)];
      p2= this.encargados[Math.floor(Math.random() * this.encargados.length)];

    }while((a1==v1 || v1==p1|| a1==p1) ||  (a2==v2 || v2==p2 || a2==p2) || (a1==a2 || v1==v2 || p1==p2))



        weeks.push({
          "start":d.getDate(),
          "end":d.getDate() + 6,
          "audio1":a1,
          "audio2":a2,
          "video1":v1,
          "video2":v2,
          "plataforma1":p1,
          "plataforma2":p2,

        });
        d.setDate(d.getDate() + 7);
    }

    let lastElement= weeks[weeks.length-1];

    d=new Date(year,month,lastElement.start);
    d.setDate(d.getDate()+6);
    lastElement.end=d.getDate();
    weeks[weeks.length-1]=lastElement;

    //console.log(lastElement);


    
    //console.log (weeks);
    return(weeks);
  }

   getMonthName(monthNumber:number) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-MX', { month: 'long' });
  }


  printdoc(){
    this.print==true;

    window.print();
    this.print==false;
  }

  Print(){
    window.print();
  }

  //DATE MODAL
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
