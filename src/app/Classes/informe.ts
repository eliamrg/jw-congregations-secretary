export class informe {
    nombre: string;
    idPublicador:string;
    horas: number| undefined;
    publicaciones:number| undefined;
    videos: number| undefined;
    revisitas:number| undefined;
    cursos:number| undefined;
    observacion:string;
    servicio:string;
    grupo:number;

    constructor(idPublicador: string, nombre: string) {
      this.nombre = nombre;
      this.idPublicador=idPublicador;
      this.horas=undefined;
      this.publicaciones= undefined;
      this.videos=undefined;
      this.revisitas=undefined;
      this.cursos=undefined;
      this.observacion="";
      this.servicio="publicador";
      this.grupo=0;
    }
  }
  
  
  