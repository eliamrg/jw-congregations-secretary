import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  handlerMessage = '';
  roleMessage = '';

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      
      handler: () => {
        this.handlerMessage = 'Alert canceled';
      },
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      cssClass: 'alert-button-cancel',
      handler: () => {
        this.handlerMessage = 'Alert confirmed';
      },
    },
  ];

  setResult(ev:any) {
    this.roleMessage = `Dismissed with role: ${ev.detail.role}`;
  }



  // admin.auth().deleteUser(uid)
  // .then(function() {
  //   console.log("Successfully deleted user");
  // })
  // .catch(function(error) {
  //   console.log("Error deleting user:", error);
  // });

}
