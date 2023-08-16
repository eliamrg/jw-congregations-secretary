import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-reporte-regular',
  templateUrl: './reporte-regular.page.html',
  styleUrls: ['./reporte-regular.page.scss'],
})
export class ReporteRegularPage implements OnInit {

  Grupos=[
    {"id":1},
    {"id":2},
    {"id":3,},
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
  constructor() { }

  ngOnInit() {
    var today=new Date();
    var currentMonth=today.getMonth();
    today.setMonth(today.getMonth()-1);
    this.wheelDate=today.toISOString();
    this.showdate();
  }


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


  print(){
    
      // let popupWinindow:any
      // let innerContents:any = document.getElementById("tablas")!.innerHTML;
      // popupWinindow = window.open('x', '_blank', 'scrollbars=no,menubar=no,toolbar=no,status=no,titlebar=no');
      // popupWinindow.document.open();
      // popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css"  /></head><body onload="window.print()"> <h1 style="font-family: Arial, Helvetica, sans-serif;"> Informe de Precursores Regulares</h1>' + innerContents + '</html>');
      
      // popupWinindow.document.close();
      
  

  }
}
