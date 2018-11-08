import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize.min.js';
declare var $:any;

// Componente que genera el reporte de pagos por empleado
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  // Reactive form
  searchForm: FormGroup;
  submitted = false; 

  // Estilo par alos botones de sweet alert
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  });
  // Variable que almacena los registros de la busqueda
  pagos;

  // Regex
  numerico = /^[0-9]*$/
  
  //ngclass para ocultar el dise;o del rpeorte mientras se carga
  divrepo = 'hide';

  // Objeto con los mensajes a mostrar para el reactive form
  account_validation_messages = {
    'numeroempleado': [
      { type: 'required', message: 'el numero de empleado es requerido' },      
      { type: 'maxlength', message: 'Maximo 10 digitos' },
      { type: 'pattern', message: 'Tu numero de empleado solo puede contener numeros' }
    ],
    'fechadesde': [
      { type: 'required', message: 'La fecha es requerida' }
    ],
    'fechahasta': [
      { type: 'required', message: 'La fecha es requerida' }
    ]
  }

  // Texto para el picker
  fechatext = {
    monthsShort	:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    months:	['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    weekdays: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
    weekdaysShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
    weekdaysAbbrev:	['D','L','M','M','J','V','S'],
    cancel	:'Cancelar',
    clear	:'Limpiar',
    done	:'Aceptar'
  };

  // configuracion para los pickers y evento onselect para guardar el valor del picker en el reactive form
  options = {
    i18n: this.fechatext,
		format : "yyyy-mm-dd",    
    onSelect: (fecha) => {
      let fechacompleta;      
      if(fecha.getDate() < 10)
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-0" + fecha.getDate();
      else
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-" + fecha.getDate();

      // remuevo y agrego fecha para que tome correctamente el valor de fecha en el reactive form
      this.searchForm.removeControl('fechadesde');
      this.searchForm.addControl('fechadesde', new FormControl(fechacompleta, [Validators.required]));
    }
  };

  options1 = {
    i18n: this.fechatext,
		format : "yyyy-mm-dd",    
    onSelect: (fecha) => {
      let fechacompleta;
      if(fecha.getDate() < 10)
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-0" + fecha.getDate();
      else
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-" + fecha.getDate();

      // remuevo y agrego fecha para que tome correctamente el valor de fecha en el reactive form
      this.searchForm.removeControl('fechahasta');
      this.searchForm.addControl('fechahasta', new FormControl(fechacompleta, [Validators.required]));
    }
  };

  constructor(private router: Router,private appService: Appservice,private formBuilder: FormBuilder) { }

  // Se inicializa el reactive y los pickers de las fechas
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      numeroempleado: [{value: 0, disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      fechadesde: ['',[ Validators.required]],
      fechahasta: ['',[ Validators.required]],
    });
    $('#fechadesde').datepicker(this.options);
    $('#fechahasta').datepicker(this.options1);
    setTimeout(() => {
      M.updateTextFields();      
    },1)
  }
  
  get s() { return this.searchForm.controls; }

  // Se busca el reporte por medio de los filtros
  buscarReporte(){
    this.divrepo = 'hide';
    $('#datatable').DataTable().destroy();
    this.submitted = true;    
    if (this.searchForm.invalid) {
        return;
    }
    // Se consume el provider para mandar la peticion al back end 
    this.appService.getReporte(this.searchForm.value["numeroempleado"],
    this.searchForm.value["fechadesde"],
    this.searchForm.value["fechahasta"])
    .subscribe(
      data => {        
        if(data.status == 1){
          this.pagos = data.response;
          // Si todo va bien se llena la tabla con la informacion
          $.getScript('//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js',function(){
              $('#datatable').DataTable({
                "lengthChange": false,
                "language": {"url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"}
             });
           });          
          this.submitted = false;
          setTimeout(() => {
            M.updateTextFields();
            this.divrepo = '';
          },200)
          
        }
        else{
          this.swalWithBootstrapButtons(
            "Error",
            data.message,
            'error'
          )
        }
      },
      error => {
        this.swalWithBootstrapButtons(
          "Error",
          error,
          'error'
        );
      }
    )
  }
}
