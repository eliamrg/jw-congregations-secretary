import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-predicacion',
  templateUrl: './reporte-predicacion.page.html',
  styleUrls: ['./reporte-predicacion.page.scss'],
})
export class ReportePredicacionPage implements OnInit {

  isModalDatePickerOpen=false;
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

    
    this.wheelDate=new Date();
    // const today=new Date(this.wheelDate);
    // console.log(today.getHours())
    // this.wheelDate.setHours(today.getHours() -6);
    
    //var today=new Date();
    // var currentMonth=today.getMonth();
    //  today.setMonth(today.getMonth()+1);
    //  this.wheelDate=today.toISOString();
    this.showdate();
  }


  //DATEPICKER
  stringDate:any;
  wheelDate:any;
  showdate(){
    console.log(this.wheelDate)

    let date=new Date(this.wheelDate );
    // console.log(date);
    // let month=date.getMonth() ;
    // // console.log(month)
    let year=date.getFullYear();
    console.log(year)
    date.setMonth(date.getMonth());
    let stringMonth= date.toLocaleString('es-MX', {
      month: 'long',
    });

    console.log(stringMonth)
    
    this.stringDate=(stringMonth + " " + year);
    
    
    
  }

  // getMonthName(monthNumber:number) {
  //   const date = new Date();
  //   date.setMonth(monthNumber+1);
  
  //   return date.toLocaleString('es-MX', { month: 'long' });
  // }




  //MODAL DATE
  // @ViewChild(IonModal)
  // modal!: IonModal;

  // message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  // nombre: string | undefined;
  // cancel() {
  //   this.modal.dismiss(null, 'cancel');
  // }

  // confirm() {
  //   this.modal.dismiss(this.nombre, 'confirm');
  // }

  

  setDatePickerOpen(open:boolean){
    this.isModalDatePickerOpen=open;
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
