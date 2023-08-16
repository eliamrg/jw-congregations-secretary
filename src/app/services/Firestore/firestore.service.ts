import { Injectable } from '@angular/core';
import { collection, doc, DocumentData, Firestore, getDocs, limit, onSnapshot, query, setDoc, Timestamp, where } from '@firebase/firestore';
import { orderBy } from '@firebase/firestore';
import { publicador } from 'src/app/Classes/publicador';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore,) { }

  async CrearPublicador(pub: publicador){
    
    await setDoc(doc(this.firestore, pub.grupo, pub.nombre), {
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

}
