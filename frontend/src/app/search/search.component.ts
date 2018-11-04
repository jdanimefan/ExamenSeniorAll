import { Component, OnDestroy, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service'
import { Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  empleados;
  
  constructor(private router: Router,private appService: Appservice) { }

  ngOnInit(): void {
    localStorage.removeItem('numeroempleado');
    this.cargarEmpleados();    
  }

  cargarEmpleados(){
    this.appService.getEmpleados()
      .subscribe(
        data => {
          this.empleados = data.response;
          $.getScript('//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js',function(){
            $('#datatable').DataTable({
              "lengthChange": false,
              "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",              
            }
             });
             setTimeout(()=>{
               //$("#datatable_length").hide();
             },500 );
           });
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
