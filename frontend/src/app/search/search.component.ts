import { Component, OnDestroy, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service'
import { Router} from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.js'
declare var $:any;

// Componente para la funcionalidad que mostrara los empleados registrados
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // Estilo par alos botones de sweet alert
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  });
  // Objeto empleados que almacenara a los empleados que obtenga de la peticion
  empleados;

  constructor(private router: Router,private appService: Appservice) { }

  // Al iniciar el componente cargara a los empleados
  ngOnInit(): void {
    localStorage.removeItem('numeroempleado');
    this.cargarEmpleados();    
  }

  // metodo que obtiene a todos los empleados registrados por medio de un provider
  cargarEmpleados(){
    this.appService.getEmpleados()
      .subscribe(
        data => {
          if(data.status == 1){
            this.empleados = data.response;
            // Se llena inicializa la  tabla a mostrar
            $.getScript('//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js',function(){
              $('#datatable').DataTable({
                "lengthChange": false,
                "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json",              
              }
               });             
             });
          }
          else{
            this.swalWithBootstrapButtons(
              "Error",
              data.status,
              'error'
            );
          }
        },
        error => {
          this.swalWithBootstrapButtons(
            "Error",
            'Ocurrio un error al obtener los datos del empleado',
            'error'
          );
        }
      )
  }

  // Cuando seleccione algun empleado a modificar almacenara la informacion
  // y enviara al componente que modifica y da de baja al empleado
  modificar(empleado){
    localStorage.setItem('numeroempleado',JSON.stringify(empleado));
    this.router.navigate(['/update']);
  }  
}
