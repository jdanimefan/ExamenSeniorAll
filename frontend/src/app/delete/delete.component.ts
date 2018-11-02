import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  })
  registerForm: FormGroup;
  submitted = false;
  roles;
  fecha;
  tipos;
  msgbtnactivo : string = 'Eliminar';
  msgiconactivo : string = 'delete';
  empleado: {
    cnomempl: string,
    iident: number,
    inumempl: number,
    irol: number,
    istatus: number,
    itipo: number
  };
  numerico = /^[0-9]*$/
  letras = /^[ña-zÑA-Z\s]+$/;
  btndeletecolor = 'blue-grey darken-4 waves-effect waves-light btn-large right';
  msgDelete = {
    eliminarmsgtitle: "Eliminar",
    eliminarmsg: '¿Esta seguro de que desea eliminar al empleado?',
    cancel : {
      msgtitle: 'Cancelado',
      msg: 'Su solicitud fue cancelada'
    },
    accept : {
      msgtitle: 'Eliminado',
      msg: 'Su empleado fue dado de baja'
    }
  }
  classcubrioturno = "hide";
  options = {
    i18n: {
			monthsShort	:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			months:	['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			weekdays: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
			weekdaysShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
			weekdaysAbbrev:	['D','L','M','M','J','V','S'],
			cancel	:'Cancelar',
			clear	:'Limpiar',
			done	:'Aceptar'
		},
		format : "yyyy-mm-dd",
    minDate: new Date(),
    onSelect: (fecha) => {
      this.registerForm.value["fecha"] = fecha.getFullYear() + "-" + fecha.getMonth() +"-" + fecha.getDate();
      console.log(this.registerForm.value["fecha"]);
    }
  };
  


  account_validation_messages = {
    'numeroempleado': [
      { type: 'required', message: 'el numero de empleado es requerido' },      
      { type: 'maxlength', message: 'Maximo 10 digitos' },
      { type: 'pattern', message: 'Tu numero de empleado solo puede contener numeros' }
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es requerido' },      
      { type: 'maxlength', message: 'Maximo 50 caracteres' },
      { type: 'pattern', message: 'Tu nombre solo puede contener letras y espacios' }      
    ],
    'fecha': [
      { type: 'required', message: 'La fecha es requerida' }
    ],
    'numeroentregas': [
      { type: 'required', message: 'El numero de entregas es requerido' },
      { type: 'maxlength', message: 'Maximo 10 digitos' },
      { type: 'pattern', message: 'El numero de entregas solo puede contener numeros' }
    ]    
    }
  constructor(private router: Router,private appService: Appservice,private formBuilder: FormBuilder) { }

  ngOnInit() {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, this.options);
    this.cargarempleado();
  }

  cargarempleado()
  {
    //this.empleado = JSON.parse(localStorage.getItem("numeroempleado"));    
    this.registerForm = this.formBuilder.group({
      numeroempleado: [{value: '', disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      nombre: [{value: 'thbfg',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      rol: [{value: 'qwe',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      tipo: [{value: 'asd',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      fecha: ['',[ Validators.required]],
      numeroentregas: [{value: 0, disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      checkcubrirturno: [{value: false, disabled: false}, [Validators.required ]],
      checkcubriochofer: [{value: false, disabled: false}, [Validators.required]],
      diaschofer:[{value: '', disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
      checkcargador: [{value: false, disabled: false}, [Validators.required]],
      diascargador: [{value: '', disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
      //radioroles: [this.empleado.irol,[ Validators.required]],
      //radiotipos: [this.empleado.itipo,[ Validators.required]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      console.log(this.registerForm.controls['fecha'].value)
      if(this.registerForm.value["checkcubrirturno"] == true)
      {
        this.classcubrioturno = "";
      }
      else{
        this.classcubrioturno = "hide";
      }
    });

    /*if(!this.empleado.istatus)
    {
      this.msgDelete.accept.msgtitle = "Activado";
      this.msgDelete.eliminarmsgtitle = "Activar";
      this.msgDelete.eliminarmsg = '¿Esta seguro de que desea activar al empleado?';
      this.btndeletecolor = 'teal lighten-3 waves-effect waves-light btn-large right';
      this.msgbtnactivo = 'Activar';
      this.msgiconactivo  = 'add';
    }    */
  }
  get f() { return this.registerForm.controls; }
  onSubmit(){
    this.submitted = true;
    console.log(this.registerForm.value)
    if (this.registerForm.invalid) {
        return;
    }     
    console.log("paso");    
  }

  cambioFecha(){
    console.log(this.fecha);
  }
}
