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
    },{merge:true}).then(()=>console.log("Post Created"));
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
    let pubs:any=[];
    const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
  
    //console.log(grupos[1])
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      gruposConPublicadores[doc.data()["grupo"]]["Publicadores"].push(doc.data())
    });
    //console.log(gruposConPublicadores)
    return gruposConPublicadores;
    
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
      fechapPublicador:pub.fechaPublicador,
      bautismo:pub.bautismo,
      esperanza:pub.esperanza,
      nombramiento:pub.nombramiento,
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
      id:id,
      Encargado: "No Asignado",
      IdEncargado: 0,
      
      
    },{merge:true});
  }


  async EditarGrupo(id:any,Encargado:any,idEncargado:any ){
    
    //console.log(id,Encargado,idEncargado)
    await setDoc(doc(this.firestore, "Grupos", id.toString()), {
      id:id,
      Encargado: Encargado,
      IdEncargado: idEncargado

    },{merge:true});
  }


  async getGrupos(){

    let Grupos:any=[{'Encargado':'No Asignado','Publicadores':[],'visible':false,}];
    //let grupo0: any[] =['0':{'Encargado':'No Asignado'}]

    const q = query(collection(this.firestore, "Grupos"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      
      let data=doc.data();

      let temp:any={
        
        'Encargado':data['Encargado'],
        'email':data['email'],
        'idEncargado':data['idEncargado'],
        'Publicadores':[],
        'visible':true,
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

    const q = query(collection(this.firestore, "Grupos"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data=doc.data();
      let temp:any={
        'Encargado':data['Encargado'],
        'Publicadores':[],
        'visible':true,
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
        Informe
      },{merge:true});

    }

    async getInformeMes(){
      let gruposConPublicadores:any= await this.getGruposSimplified();
      const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
      //console.log(grupos[1])
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const tempPub:any={
          id:doc.data()["id"],
          nombre:doc.data()["nombre"],
          "informe":new informe(doc.data()["id"],doc.data()["nombre"])
        }
        tempPub.informe.grupo=doc.data()["grupo"]
        gruposConPublicadores[doc.data()["grupo"]]["Publicadores"].push(tempPub)
      });
      return gruposConPublicadores;
  }





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
