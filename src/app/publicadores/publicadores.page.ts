import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicadores',
  templateUrl: './publicadores.page.html',
  styleUrls: ['./publicadores.page.scss'],
})
export class PublicadoresPage implements OnInit {
  randomNumber!: number;
  Grupos=[
    {"id":1,
      "Publicadores":[
        {"id":"p1",
          "privilegio": "Anciano"
        },
        {"id":"p2",
        "privilegio": "Siervo Ministerial"
        },
        
        {"id":"p3",
        "privilegio": "Precursor Regular"
        },
        {"id":"p4",
        "privilegio": "Publicador"
        },
      ]
    },
    {"id":2,
    "Publicadores":[
      {"id":"p5",
      "privilegio": "Anciano"
    },
      {"id":"p6"},
      {"id":"p7"}
    ]
    },
    {"id":3,
    "Publicadores":[
      {"id":"p7",
      "privilegio": "Anciano"
    },
      {"id":"p8"},
      {"id":"p9"}
    ]
    },
    {"id":4},
    {"id":5},
    {"id":6},
    {"id":7},
    {"id":8},
    {"id":9},
    {"id":10},
    {"id":11},
    {"id":12},
  ]

  constructor() { }

  ngOnInit() {
    this.randomNumber= Math.floor(Math.random() * 999999);
  }



  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
