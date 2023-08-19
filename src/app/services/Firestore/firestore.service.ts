import { Injectable } from '@angular/core';
//import {  orderBy,collection, query, where, getDocs,setDoc, onSnapshot, doc, DocumentData, Firestore, limit, Timestamp } from '@firebase/firestore';
//import { FirebaseApp, doc } from 'firebase/app';
//import {Firestore, doc, setDoc, getDoc,query,onSnapshot,orderBy,collection} from 'firebase/firestore'
import { Firestore, collection, addDoc, setDoc, doc, getDoc, query, where, getDocs, onSnapshot, orderBy } from '@angular/fire/firestore';
import { publicador } from 'src/app/Classes/publicador';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore:Firestore) { }

  async CrearPublicador(pub: publicador){
    
    
    await setDoc(doc(this.firestore, "Publicadores", pub.nombre), {
    nombre: pub.nombre,
    direccion: pub.direccion,
    telefono: pub.telefono,
    celular: pub.celular,
    nacimiento: pub.nacimiento,
    bautizado:pub.bautizado,
    bautismo: pub.bautismo,
    esperanza:pub.esperanza,
    nombramiento: pub.nombramiento,
    grupo: pub.grupo,
    acomodador:false,
    sonido: false,
    },{merge:true}).then(()=>console.log("Post Created"));
  }


  async getPublicadores(){
    console.log("hola");
    const q = query(collection(this.firestore, "Publicadores"),orderBy("nombre","asc"));
    return onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " x=> ", doc.data());
      });   
    });
  }


  async prueba(){
    const q = query(collection(this.firestore, "Publicadores"));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
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
