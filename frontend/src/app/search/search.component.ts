import { Component, OnDestroy, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service'
import { Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dtOptions: DataTables.Settings = {};    
  empleados;
  constructor(private router: Router,private appService: Appservice) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(){
    this.appService.getEmpleados()
      .subscribe(
        data => {
          this.empleados = data.response;
          console.log(this.empleados);
          console.log("cargar");
          this.dtOptions.renderer;
          this.dtOptions = {  
            pagingType: 'full_numbers',      
            pageLength: 10,
          };          
        },
        error => {
          console.log(error);
        }
      )
  }

  modificar(empleado){
    localStorage.setItem('numeroempleado',JSON.stringify(empleado));
    this.router.navigate(['/update']);
  }
}
