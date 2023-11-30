import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/Firestore/firestore.service';

@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.page.html',
  styleUrls: ['./publicadores.page.scss'],
})
export class PublicadoresPage implements OnInit {

  constructor( private firestore: FirestoreService) { }

PublicadoresPorGrupo :any;
Publicadores :any;
separarPorGrupo:boolean=false;

  async ngOnInit() {
    await this.firestore.getPublicadoresPorGrupo().then(PUBS=>{
      this.PublicadoresPorGrupo=PUBS;
    });
    await this.firestore.getPublicadores().then(PUBS=>{
      this.Publicadores=PUBS;
    });
  }

}
