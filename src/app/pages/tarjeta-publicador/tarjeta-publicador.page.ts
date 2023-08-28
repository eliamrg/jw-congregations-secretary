import { Component, OnInit, inject } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { publicador } from 'src/app/Classes/publicador';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';


export interface PeriodicElement {
  mes: string;
  publicaciones:number;
  position: number;
  horas: number;
  videos: number;
  revisitas:number;
  cursos:number;
  observaciones:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, mes: 'Septiembre',publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 2, mes: 'Octubre', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 3, mes: 'Noviembre', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 4, mes: 'Diciembre', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 5, mes: 'Enero', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 6, mes: 'Febrero', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 7, mes: 'Marzo', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 8, mes: 'Abril', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 9, mes: 'Mayo', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 10, mes: 'Junio', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 11, mes: 'Julio', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
  {position: 12, mes: 'Agosto', publicaciones:10, horas: 10, videos: 10,revisitas:10,cursos:10, observaciones:""},
];



@Component({
  selector: 'app-tarjeta-publicador',
  templateUrl: './tarjeta-publicador.page.html',
  styleUrls: ['./tarjeta-publicador.page.scss'],
})



export class TarjetaPublicadorPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = [ 'mes','publicaciones', 'horas', 'videos','revisitas','cursos','observaciones'];
  dataSource = ELEMENT_DATA;
  isPrinting=false;
  
  Publicador:any=new publicador(this.firestore.getRandomNumber(0,9999).toString(),"");
  
   id!: string;
  
  
  constructor(public menuCtrl: MenuController, private firestore: FirestoreService) { }
  async ngOnInit() {
      this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
       await this.firestore.getPublicador(this.id).then(x=>{
        this.Publicador=x;
        if (this.Publicador.esperanza=='OtrasOvejas'){
          this.Publicador.esperanza='Otras Ovejas';
        }
      });
     
      console.log(this.Publicador)
    }
    
    
  
  
  
  // print(){
  //   this.isPrinting=true;
  //   var prtContent:any = document.getElementById("printableArea");
  //   var WinPrint:any = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

  //   WinPrint.document.write(prtContent.innerHTML);

  //   WinPrint.document.close();
  //   //WinPrint.focus();
  //   //WinPrint.print();
  //   //WinPrint.close();
  //   this.isPrinting=false;
  // }

}
