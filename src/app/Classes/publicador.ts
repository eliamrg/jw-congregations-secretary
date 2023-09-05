export class publicador {
    id!: string;
    nombre!: string;
    direccion: string | undefined;
    telefono: string | undefined;
    celular: string | undefined;
    nacimiento: Date | undefined;
    bautizado!:boolean;
    bautismo: Date | undefined;
    esperanza: string | undefined;
    nombramiento: string | undefined;
    grupo: number | undefined;
    acomodador!: boolean;
    sonido!: boolean;
    discapacidades:string | undefined;
    sexo:string|undefined;
    uid:string |undefined;
    isUser!:boolean;
    //AGREGAR Activo, sordo, ciego, encarcelado cambiar esperanza en tarjeta
    
    constructor(id: string,nombre: string) {
        let date: Date = new Date();  ;
        this.id = id;
        this.nombre = nombre;
        this.direccion="";
        this.telefono="";
        this.celular="";
        this.nacimiento= date;
        this.bautizado=false;
        this.bautismo=date;
        this.esperanza="OtrasOvejas";
        this.nombramiento="Publicador";
        this.grupo=1;
        this.acomodador=false;
        this.sonido=false;
        this.discapacidades="";
        this.sexo='H';
        this.uid='';
        this.isUser=false;
    }

    
}