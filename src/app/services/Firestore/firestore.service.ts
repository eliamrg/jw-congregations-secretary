import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, setDoc, doc, getDoc, query, where, getDocs, onSnapshot, orderBy } from '@angular/fire/firestore';
import { publicador } from 'src/app/Classes/publicador';
import { from } from 'rxjs';
import { informe } from 'src/app/Classes/informe';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore:Firestore) { }
  userPrivs:any;
  //PUBLICADORES--------------------------------------------------------------------------------------------------

  async CrearPublicador(pub: publicador){ //AL CREAR PASAR EL ID
  
    await setDoc(doc(this.firestore, "Publicadores", pub.id), {
      id:pub.id,
      nombre: pub.nombre,
      direccion: pub.direccion,
      telefono: pub.telefono,
      celular: pub.celular,
      nacimiento: pub.nacimiento,
      fechaPublicador: pub.fechaPublicador,
      bautizado:pub.bautizado,
      bautismo: pub.bautismo,
      esperanza:pub.esperanza,
      nombramiento: pub.nombramiento,
      precursor: pub.precursor,
      grupo: pub.grupo,
      acomodador:false,
      sonido: false,
      discapacidades:pub.discapacidades,
      sexo:pub.sexo,
      uid:pub.uid,
      isUser:pub.isUser,
      activo:pub.activo,
      sordo:pub.sordo,
      ciego:pub.ciego,
      encarcelado:pub.encarcelado,
    },{merge:true}).then(()=>console.log("Publicador Created"));
  }

  async getPublicador(id:string){
    const docRef = doc(this.firestore, "Publicadores", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      return false
    }
  }

  async getPublicadoresPorGrupo(){
    
    let gruposConPublicadores:any= await this.getGrupos();
    //console.log(gruposConPublicadores)
    const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
  
    //console.log(grupos[1])
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      gruposConPublicadores[doc.data()["grupo"]]["Publicadores"].push(doc.data())
    });
    //console.log(gruposConPublicadores)
    return gruposConPublicadores;
    
  }

  async getPublicadores(){
    let Publicadores:any=[]
    const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      Publicadores.push(doc.data())
    });
    return Publicadores;
  }
    
  
  async BorrarPublicador(id:string){
    await deleteDoc(doc(this.firestore, "Publicadores", id));
  }

  mapPublicador(pub:publicador){
    let temp={
      id:  pub.id,
      nombre : pub.nombre,
      direccion:pub.direccion,
      telefono:pub.telefono,
      celular:pub.celular,
      nacimiento: pub.nacimiento,
      bautizado:pub.bautizado,
      fechaPublicador:pub.fechaPublicador,
      bautismo:pub.bautismo,
      esperanza:pub.esperanza,
      nombramiento:pub.nombramiento,
      precursor:pub.precursor,
      grupo:pub.grupo,
      acomodador:pub.acomodador,
      sonido:pub.sonido,
      discapacidades:pub.discapacidades,
      sexo:pub.sexo,
      uid:pub.uid,
      isUser:pub.isUser,
      activo:pub.activo,
      sordo:pub.sordo,
      ciego:pub.ciego,
      encarcelado:pub.encarcelado,
    }
    return temp;
  }


  //GRUPOS---------------------------------------------------------------------------------------------------------


  
  async CrearGrupo(id:any){
    await setDoc(doc(this.firestore, "Grupos", id), {
      id:Number(id),
      Encargado: "No Asignado",
      Auxiliar: "No Asignado",
      IdEncargado: 0,
    },{merge:true});
  }


  async EditarGrupo(id:any,Encargado:any, idEncargado:any, Auxiliar:any ){
    
    //console.log(id,Encargado,idEncargado)
    await setDoc(doc(this.firestore, "Grupos", id.toString()), {
      id:Number(id),
      Encargado: Encargado,
      Auxiliar: Auxiliar,
      IdEncargado: idEncargado
    },{merge:true});
  }


  async getGrupos(){

    let Grupos:any=[{'Encargado':'No Asignado','Publicadores':[],'visible':false,}];
    //let grupo0: any[] =['0':{'Encargado':'No Asignado'}]

    const q = query(collection(this.firestore, "Grupos"),orderBy("id","asc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      let data=doc.data();
      this.userPrivs = JSON.parse(localStorage.getItem("userData")!);
      let temp:any={
        
        'Encargado':data['Encargado'],
        'Auxiliar':data['Auxiliar'],
        'email':data['email'],
        'idEncargado':data['IdEncargado'],
        'Publicadores':[],
        'visible':true,
        'permitido':true,
      }
      if (!this.userPrivs.administrador){
        temp['visible']=this.userPrivs.grupos.includes(doc.id);
        temp['permitido']=this.userPrivs.grupos.includes(doc.id);
      }
      
      Grupos.push(temp);
      //console.log(doc.id, " => ", doc.data());
    });

    //console.log(Grupos);
    return Grupos;
  }


  async getGruposSimplified(){

    let Grupos:any=[{'Encargado':'No Asignado','Publicadores':[],'visible': false}];
    //let grupo0: any[] =['0':{'Encargado':'No Asignado'}]

    const q = query(collection(this.firestore, "Grupos"),orderBy("id","asc"));

    this.userPrivs = JSON.parse(localStorage.getItem("userData")!);
    

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data=doc.data();
      let temp:any={
        'Encargado':data['Encargado'],
        'Auxiliar':data['Auxiliar'],
        'Publicadores':[],
        'visible':true,
        'permitido':true,
      }
      if (!this.userPrivs.administrador){
        temp['visible']=this.userPrivs.grupos.includes(doc.id);
        temp['permitido']=this.userPrivs.grupos.includes(doc.id);
      }
      Grupos.push(temp);
    
    });

    //console.log(Grupos);
    return Grupos;
  }


  async BorrarGrupo(id:string){
    await deleteDoc(doc(this.firestore, "Grupos", id));
  }
  


  getRandomNumber(min:number, max:number) {
    const floatRandom = Math.random()
    const difference = max - min
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)
    const randomWithinRange = random + min
    return randomWithinRange
    }

  
    //ASISTENCIA-------------------------------------------------------------------------------------


    async setAsisteniaAnual(Anio:any,Asistencia:any){
      await setDoc(doc(this.firestore, "Asistencia",Anio), {
        Asistencia
      },{merge:true});
    }

    async getAsistenciaAnual(Anio:any){
      const docRef = doc(this.firestore, "Asistencia", Anio);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return false
      }

    }


    async setAsistenciaSemanal(Anio:any,Mes:any,Dia:any,entreSemana:any,finSemana:any){
      
      await setDoc(doc(this.firestore, "Asistencia/"+Anio+"/"+Mes, Dia), {
        entreSemana:entreSemana,
        finSemana: finSemana
      },{merge:true});

    }

    async getAsistenciaSemanal(Anio:any,Mes:any,Dia:any){
      const docRef = doc(this.firestore, "Asistencia/"+Anio+"/"+Mes, Dia);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return false
      }
    

    }

    async getAsistenciaMensual(Anio:any,Mes:any){
      const q = query(collection(this.firestore, "Asistencia/"+Anio+"/"+ Mes));

      const querySnapshot = await getDocs(q);
      let data:any={};
      querySnapshot.forEach((doc) => {
        let docid=doc.id;
        let docData=doc.data();
        
        data[docid]=docData
        
      });
    
      return data;

    }

    //Informes-------------------------------------------------------------------------------------------------

    async setInformeMes(Anio:any,Mes:any,Informe:any,Userid:any){
      
      await setDoc(doc(this.firestore, "Informes/"+Anio+"/"+Mes, Userid), {
        nombre: Informe.nombre,
        idPublicador:Informe.idPublicador,
        horas: Informe.horas ||0,
        publicaciones:Informe.publicaciones||0,
        videos: Informe.videos||0,
        revisitas:Informe.revisitas||0,
        cursos:Informe.cursos||0,
        observacion:Informe.observacion||"",
        servicio:Informe.servicio,
        grupo:Informe.grupo,
        participo:Informe.participo
      },{merge:true});

    }

  async getInformeMes(Anio:any,Mes:any){
  let gruposConPublicadores:any= await this.getGruposSimplified();
  const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
  console.log(gruposConPublicadores)
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (document) => {

    let informePub:any=new informe(document.data()["id"],document.data()["nombre"]);
    //obtener informe
    const InformeSnap = await getDoc(doc(this.firestore, "Informes/"+Anio+"/"+Mes, document.data()["id"]))
    
    
    if (InformeSnap.exists()) {
      informePub= InformeSnap.data();
      //console.log(InformeSnap.data())
    }
    const tempPub:any={
      id:document.data()["id"],
      nombre:document.data()["nombre"],
      precursor:document.data()["precursor"],
      "informe":informePub
    }

    if(tempPub.precursor=="regular" || tempPub.precursor=="especial" ){
      tempPub.informe.servicio=tempPub.precursor;
    } 
    tempPub.informe.grupo=document.data()["grupo"]
    gruposConPublicadores[document.data()["grupo"]]["Publicadores"].push(tempPub)
    
  });
  console.log(gruposConPublicadores)
  return gruposConPublicadores;
}




  async getInformeMeses(meses:any){
     

      let gruposConPublicadores:any= await this.getGruposSimplified();
      const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
      const querySnapshot = await getDocs(q);
      //console.log(gruposConPublicadores)
      querySnapshot.forEach(async (document) => {

        

        let informes:any=[];
        
        meses.forEach(async ( month:any) => {
          let informePub:any=new informe(document.data()["id"],document.data()["nombre"]);
          informePub.participo=false;
          const InformeSnap = await getDoc(doc(this.firestore, "Informes/"+month.year+"/"+month.month, document.data()["id"]))
          
          if (InformeSnap.exists()) {
            informePub= InformeSnap.data();
            //console.log(InformeSnap.data())
          }
          if(document.data()["precursor"]=="regular" || document.data()["precursor"]=="especial" ){
            informePub.servicio=document.data()["precursor"];
          } 
          informePub.grupo=document.data()["grupo"]
          

          informePub["FormatoAnterior"]=(month.month<10 && month.year<=2023);
          let informeMes={
            mes:month.month,
            anio:month.year,
            monthName:month.monthName,
            informe:informePub
          }
          informes.push(informeMes);
        });

        
        //obtener informe
        
        
        
       
        const tempPub:any={
          id:document.data()["id"],
          nombre:document.data()["nombre"],
          precursor:document.data()["precursor"],
          "informes":informes
        }

        
        
        gruposConPublicadores[document.data()["grupo"]]["Publicadores"].push(tempPub)
        
      });
      //console.log(gruposConPublicadores)
      return gruposConPublicadores;
}




//ORIGINAL
// async getInformeMes(Anio:any,Mes:any){
//   let gruposConPublicadores:any= await this.getGruposSimplified();
//   const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
//   console.log(gruposConPublicadores)
//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach(async (document) => {

//     let informePub:any=new informe(document.data()["id"],document.data()["nombre"]);
//     //obtener informe
//     const InformeSnap = await getDoc(doc(this.firestore, "Informes/"+Anio+"/"+Mes, document.data()["id"]))
    
    
//     if (InformeSnap.exists()) {
//       informePub= InformeSnap.data();
//       //console.log(InformeSnap.data())
//     }
//     const tempPub:any={
//       id:document.data()["id"],
//       nombre:document.data()["nombre"],
//       precursor:document.data()["precursor"],
//       "informe":informePub
//     }

//     if(tempPub.precursor=="regular" || tempPub.precursor=="especial" ){
//       tempPub.informe.servicio=tempPub.precursor;
//     } 
//     tempPub.informe.grupo=document.data()["grupo"]
//     gruposConPublicadores[document.data()["grupo"]]["Publicadores"].push(tempPub)
    
//   });
//   console.log(gruposConPublicadores)
//   return gruposConPublicadores;
// }



}


 


/*
import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, limit, onSnapshot, query, setDoc, Timestamp, where } from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore:Firestore, private userService: UserService) { }
  


  async createPost(postID:any,caption:any,picture:any){
    

    let Userid=this.userService.getUserId();

    await setDoc(doc(this.firestore, "Posts", postID), {
      user:Userid,
      caption:caption,
      picture:picture,
      likes:0,
      likesList:[],
      coments:[],
      date: Timestamp.now()
    },{merge:true}).then(()=>console.log("Post Created"));
  }

  async getPosts(){
    const q = query(collection(this.firestore, "Posts"),orderBy("date","desc"), limit(2));
    return onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });   
    });
  }

  async getUserPosts(Userid:any){
    let posts: { id: string; picture: any; }[]=[]
    const q = query(collection(this.firestore, "Posts"),where("user","==",Userid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      let post={
        id:doc.id,
        picture:doc.data()["picture"]
      }
      posts.push(post)
    });
    return posts;
  }



}
*/
