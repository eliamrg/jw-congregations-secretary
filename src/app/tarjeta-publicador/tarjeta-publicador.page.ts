import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';


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

  displayedColumns: string[] = [ 'mes','publicaciones', 'horas', 'videos','revisitas','cursos','observaciones'];
  dataSource = ELEMENT_DATA;
  constructor() { }



  title = 'htmltopdf';
  
  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }

  ngOnInit() {
  }

}
