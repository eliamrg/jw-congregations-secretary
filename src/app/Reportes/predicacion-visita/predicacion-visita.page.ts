import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

interface MonthInfo {
  year: number | undefined;
  month: number | undefined;
  monthName: string | undefined;
  selected: boolean; 
}

@Component({
  selector: 'app-predicacion-visita',
  templateUrl: './predicacion-visita.page.html',
  styleUrls: ['./predicacion-visita.page.scss'],
})




export class PredicacionVisitaPage implements OnInit {

  constructor(private firestore:FirestoreService) { }

  reporte:any
  reportePrecursores:any=[];
  mesesSeleccionados: string[] = [];
  Ultimos15meses:any;
  reporteGenerado=false;
  ngOnInit() {
    this.Ultimos15meses=this.getLastMonths(15)
    //console.log(this.Ultimos15meses)
    //this.firestore.getInformeMeses(this.getLastMonths(3));
    
  }

  async GenerarReporte(){
    //console.log(this.getSelectedMonths(this.Ultimos15meses))
    await this.firestore.getInformeMeses(this.getSelectedMonths(this.Ultimos15meses)).then(report=>{
      this.reporte=report;
      this.getOnlyPrecursores();
    
    });
    console.log(this.reporte)
    this.reporteGenerado=true;
  }

  getOnlyPrecursores(){
    this.reporte.forEach((grupo:any) => {
      grupo.Publicadores.forEach((publicador:any) => {
        if(publicador.precursor!="no")
        this.reportePrecursores.push(publicador);
      });
    });

    console.log(this.ordenarPorNombre(this.reportePrecursores))
  }

  ordenarPorNombre(arr:any) {
    // Utiliza la función sort para ordenar el arreglo por el nombre
    arr.sort((a:any, b:any) => {
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();
  
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
  
    return arr;
  }
  
  getLastMonths(numMonths: number): MonthInfo[] {
    const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1; // Suma 1 para ajustar al formato de meses (1-12)

      const lastMonths: MonthInfo[] = [];

      for (let i = 0; i < numMonths; i++) {
          const year = currentMonth - i <= 0 ? currentYear - 1 : currentYear;
          const month = ((currentMonth - i - 1) + 12) % 12 + 1; // Asegura que obtenemos números de mes válidos entre 1 y 12
          const monthName = this.getMonthName(month) + ' ' + year;
          
          lastMonths.push({ year, month, monthName, selected: false });
      }

      return lastMonths;
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return monthNames[month - 1];
  }

  getSelectedMonths(lastMonths: MonthInfo[]): MonthInfo[] {
    const selectedMonths:any = [];

    lastMonths.forEach(month => {
      if (month.selected) {
        selectedMonths.push(month);
      }
    });

    return selectedMonths.sort((a:any, b:any) => {
      // Ordenar por año y mes de manera ascendente
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });
  }
  updateSelectedMonths() {
    console.log('Selected months:', this.mesesSeleccionados);
    this.Ultimos15meses.forEach((mes:any) => {
      mes.selected = this.mesesSeleccionados.includes(mes.monthName);
    });
    
    
  }
}

