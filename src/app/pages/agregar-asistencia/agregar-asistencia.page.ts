import { Component, OnInit,  ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AuthService } from 'src/app/services/Auth/auth.service';


@Component({
  selector: 'app-agregar-asistencia',
  templateUrl: './agregar-asistencia.page.html',
  styleUrls: ['./agregar-asistencia.page.scss'],
})
export class AgregarAsistenciaPage implements OnInit {

  weeks: { start: number; end: number; }[] | undefined;
  constructor(private auth:AuthService) { }
  wheelDate:any;
  stringDate:any;

  async ngOnInit() {

    this.wheelDate=new Date().toISOString();
    this.showdate();
    //this.weeks=this.getWeeksInMonth(2023,6);
    // this.auth.getUserObservable("1FiAbMWfjYbq9EyY4lURxJRuGAA3").then(x=>{
    //   console.log(x)
    // });
    
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
        weeks.push({"start":d.getDate(),"end":d.getDate() + 6});
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
