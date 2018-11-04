import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize.min.js';
declare var $:any;
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  searchForm: FormGroup;
  submitted = false; 
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  });

  numerico = /^[0-9]*$/
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
  options = {
    i18n: this.fechatext,
		format : "yyyy-mm-dd",
    minDate: new Date(),
    onSelect: (fecha) => {
      let fechacompleta;
      console.log('fecha1');
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
    minDate: new Date(),
    onSelect: (fecha) => {
      let fechacompleta;
      console.log('fecha2');
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

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      numeroempleado: [{value: '', disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      fechadesde: ['',[ Validators.required]],
      fechahasta: ['',[ Validators.required]],
    });
    $('#fechadesde').datepicker(this.options);
    $('#fechahasta').datepicker(this.options1);
  }
  
  get s() { return this.searchForm.controls; }

  buscarReporte(){
    this.submitted = true;
    console.log(this.searchForm.value);
    if (this.searchForm.invalid) {
        return;
    }
    this.appService.getReporte(this.searchForm.value["numeroempleado"],
    this.searchForm.value["fechadesde"],
    this.searchForm.value["fechahasta"])
    .subscribe(
      data => {
        console.log(data);
        if(data.status == 1){
          console.log(data);
          setTimeout(() => {
            M.updateTextFields();
          },1)
          this.submitted = false;
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
        )
      }
    )
  }
}
