import { Component, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  roles;
  tipos;
  constructor(private appService: Appservice) { }

  ngOnInit() {
    this.cargarTipos();
  }

  cargarTipos(){
    // cargando los tipos de empleado
    this.appService.getTipo()
      .subscribe(
        data => {
          if(data.status == 1)
            this.tipos = data.response;
          //else
            //mensaje de error
        },
        error => {
            //this.alertService.error(error);                   
            console.log(error);                    
      });
    // cargando los roles del empleado
    this.appService.getRol()
      .subscribe(
        data => {
          if(data.status == 1)
          this.roles = data.response;
          //else
          //mensaje de error
        },
        error => {
          console.log(error);
        }
      );
  }

}
