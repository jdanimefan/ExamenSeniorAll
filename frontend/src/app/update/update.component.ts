import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  msgbtnactivo : string = 'Eliminar';
  msgiconactivo : string = 'delete';
  numeroempleado : number = 97569429;
  roles =[
    {id: 1,rol: 'Chofer'},
    {id: 2,rol: 'Cargador'},
    {id: 3,rol: 'Auxiliar'},
  ]

  tipos =[
    {id: 1,tipo: 'Interno'},
    {id: 2,tipo: 'Externo'}    
  ]

  constructor() { }

  ngOnInit() {
  }

  desactivar(){
    swal('Hello world!')
  }
}
