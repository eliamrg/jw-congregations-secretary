import { Component, OnInit,  ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';


@Component({
  selector: 'app-agregar-asistencia',
  templateUrl: './agregar-asistencia.page.html',
  styleUrls: ['./agregar-asistencia.page.scss'],
})
export class AgregarAsistenciaPage implements OnInit {

  weeks: {anio:any; mes:any;start: number; end: number; entreSemana:any; finSemana:any }[] | undefined;
  constructor(private firestore:FirestoreService) { }
  wheelDate:any;
  stringDate:any;
  asistenciaAnual:any;

  async ngOnInit() {
    let UTCDate=new Date();
    UTCDate.setHours(UTCDate.getHours() + 6);
    this.wheelDate=UTCDate.toISOString();
    this.showdate();
    
    
  }



  guardar(anio:any,mes:any,start:any,entreSemana:any,finSemana:any){
    

    if(!((entreSemana==0 && finSemana==0) || (entreSemana==undefined && finSemana==undefined) || (entreSemana==null && finSemana==null))){
      this.firestore.setAsistenciaSemanal(anio.toString(),mes.toString(),start.toString(),Number(entreSemana),Number(finSemana));
      console.log(anio,mes,start,entreSemana,finSemana)
    }
    
  }







  //DATEPICKER
  showdate(){
    let date=new Date(this.wheelDate);
    console.log(date);
    let month=date.getMonth() +1;
    let year=date.getFullYear();
    let stringMonth=this.getMonthName(month);
    
    this.stringDate=(stringMonth + " " + year);
    this.weeks=this.getWeeksInMonth(year,month-1 );

    this.showAsistencia(date.getFullYear(),date.getMonth()+1);
    
    
  }

  async showAsistencia(anio:any,mes:any){
    
    //console.log(anio,mes)
    this.firestore.getAsistenciaMensual(anio.toString(),mes.toString()).then(x=>{
      this.weeks!.forEach((element:any,index:number) => {
      
        if(x[this.weeks![index]["start"]]!=undefined){
          this.weeks![index]["entreSemana"]=x[this.weeks![index]["start"]]["entreSemana"];
          this.weeks![index]["finSemana"]=x[this.weeks![index]["start"]]["finSemana"];
        }
      });
    })

    // await this.firestore.getAsistenciaSemanal("2023","9","4").then((x:any)=>{
    //   console.log(x)
    // });

    

     //console.log(this.weeks)
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
        weeks.push({"anio":d.getFullYear(),"mes":d.getMonth()+1,"start":d.getDate(),"end":d.getDate() + 6, "entreSemana":undefined, "finSemana":undefined});
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
    const date = new Date(this.wheelDate);
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-MX', { month: 'long' });
  }



  //DATE MODAL
  @ViewChild(IonModal)
  modal!: IonModal;

  confirm() {
    this.modal.dismiss("", 'confirm');
  }

  onWillDismiss(event: Event) {
    
  }



}
