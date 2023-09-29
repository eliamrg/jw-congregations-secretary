export class informe {
    nombre: string;
    idPublicador:string;
    horas: number| null;
    publicaciones:number| null;
    videos: number| null;
    revisitas:number| null;
    cursos:number| null;
    observacion:string;
    servicio:string;
    grupo:number;


    constructor(idPublicador: string, nombre: string) {
      this.nombre = nombre;
      this.idPublicador=idPublicador;
      this.horas=null;
      this.publicaciones= null;
      this.videos=null;
      this.revisitas=null;
      this.cursos=null;
      this.observacion="";
      this.servicio="Publicador";
      this.grupo=0;
    }

  }
  
  
  