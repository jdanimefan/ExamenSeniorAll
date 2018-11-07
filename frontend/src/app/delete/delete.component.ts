import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize.min.js';

// Componente que se encarga de realizar los pagos mensuales del empleado
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  // Estilos de botones para el swwet alert2 
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  })
  // Reactive forms declaracion
  registerForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  
  // Declaracion de variables 
  fecha;
  numerempleado;
  empleado: {
    cnomempl: string,
    iident: number,
    inumempl: number,
    irol: number,
    istatus: number,
    itipo: number
  };

  // Regex
  numerico = /^[0-9]*$/
  letras = /^[ña-zÑA-Z\s]+$/;

  // Se declara un objeto que tiene mensajes al momento de eliminar en empleado
  msgConfirmacion = {
    confirmmsgtitle: "Pago Mensual",
    confirmmsg: 'Confirmar Mensaje de pago mensual',
    cancel : {
      msgtitle: 'Cancelado',
      msg: 'Su solicitud fue cancelada'
    },
    accept : {
      msgtitle: 'Pagado',
      msg: 'Se realizo el pago mensual'
    }
  }

  // Ngclass para ocultar y agregar estilos a las etiquetas 
  classcubrioturno = "hide";
  classpagomensual = "hide";
  classdiascargador = "hide";
  classdiaschofer = "hide";
  classvaliddiaschofer = '';
  classvaliddiascargador = '';

  //Configuracion de texto  para la fecha
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
  // propiedades para el picker de fecha y setear el valor al reactive form al momento de seleccionar una fecha
  options = {
    i18n: this.fechatext,
		format : "yyyy-mm-dd",
    minDate: new Date(),
    onSelect: (fecha) => {
      let fechacompleta;

      if(fecha.getDate() < 10)
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-0" + fecha.getDate();
      else
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-" + fecha.getDate();

      // Remuevo y agrego fecha para que tome correctamente el valor de fecha en el reactive form
      this.registerForm.removeControl('fecha');
      this.registerForm.addControl('fecha', new FormControl(fechacompleta, [Validators.required]));
    }
  };

  // Objeto con los mensajes a mostrar para la svalidaciones del reactive  form
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
    ],
    'diasfalto': [
      { type: 'required', message: 'Los dias que falto es requerido' },
      { type: 'maxlength', message: 'Maximo 2 digitos' },
      { type: 'pattern', message: 'Los dias que falto solo puede contener numeros' }
    ],
    'diaschofer': [
      { type: 'required', message: 'Los dias de chofer es requerido' },
      { type: 'maxlength', message: 'Maximo 2 digitos' },
      { type: 'pattern', message: 'Los dias de chofer solo puede contener numeros' }
    ],
    'diascargador': [
      { type: 'required', message: 'Los dias de cargador es requerido' },
      { type: 'maxlength', message: 'Maximo 2 digitos' },
      { type: 'pattern', message: 'Los dias de cargador solo puede contener numeros' }
    ]
  }

  constructor(private router: Router,private appService: Appservice,private formBuilder: FormBuilder) { }

  // Se inicializa el datepicker, se inicializa el reactive y el materialize
  ngOnInit() {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, this.options);
    this.iniciarReactive();
    setTimeout(() => {
      M.updateTextFields();
    },1)
  }

  // Se inicializa el reactive form con sus controles y validaciones necesarias
  iniciarReactive()
  {        
    this.searchForm = this.formBuilder.group({
      numeroempleado: [{value: '', disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]]     
    });

    this.registerForm = this.formBuilder.group({      
      nombre: [{value: '',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      rol: [{value: '',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      tipo: [{value: '',disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
      fecha: ['',[ Validators.required]],
      numeroentregas: [{value: 0, disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      checkcubrirturno: [{value: false, disabled: false}, [Validators.required ]],
      checkcubriochofer: [{value: false, disabled: false}, [Validators.required]],
      diasfalto:[{value: 0, disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
      diaschofer:[{value: 0, disabled: false}, [Validators.required,Validators.pattern(this.numerico), Validators.maxLength(2)]],
      checkcargador: [{value: false, disabled: false}, [Validators.required]],
      diascargador: [{value: 0, disabled: false}, [Validators.required,Validators.pattern(this.numerico), Validators.maxLength(2)]],      
    });
  }
  get s() { return this.searchForm.controls; }
  get f() { return this.registerForm.controls; }
  
  // Se valida que los datos sean correctos, y se realiza una confirmacion para realizar el pago
  onSubmit(){
    this.submitted = true;
    if(this.registerForm.value['checkcubrirturno'] == true){
      if(this.registerForm.value['checkcubriochofer'] == true && 
        (this.registerForm.value['diaschofer'] == "" ||
        this.registerForm.value['diaschofer'] == 0 ) ){
          this.classvaliddiaschofer = 'invalid';
          return;
      }
      else
      this.classvaliddiaschofer = '';

      if(this.registerForm.value['checkcargador'] == true && 
        (this.registerForm.value['diascargador'] == "" ||
        this.registerForm.value['diascargador'] == 0 ) ){
          this.classvaliddiascargador = 'invalid';
          return;
      }
      else
      this.classvaliddiascargador = '';

      if (this.registerForm.invalid) {
          return;
      }
    }
    else{
      if(!this.registerForm.get('fecha').valid || 
      !this.registerForm.get('numeroentregas').valid || 
      !this.registerForm.get('checkcubrirturno').valid){
        return;
      }
    }

    // Si pasa las validaciones pregunta una confirmacion
    this.swalWithBootstrapButtons({
      title: this.msgConfirmacion.confirmmsgtitle,
      text: this.msgConfirmacion.confirmmsg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // Si se confirma manda llamar el provider que pedira la peticion al servicio para realizar el pago
        this.appService.pagoMensual(this.numerempleado, this.registerForm.value['fecha'],
          this.registerForm.value['checkcubrirturno'], this.registerForm.value['checkcubriochofer'],
          this.registerForm.value['checkcargador'], this.registerForm.value['diaschofer'],
          this.registerForm.value['diascargador'], this.registerForm.value['numeroentregas'],
           this.registerForm.value['diasfalto'])
          .subscribe(
            data => {
              if(data.status == 1)
              {
                this.swalWithBootstrapButtons(
                  this.msgConfirmacion.accept.msgtitle,
                  data.message,
                  'success'
                )
                this.router.navigate(['/delete']);
              }
              else
              {
                this.swalWithBootstrapButtons(
                  "Error",
                  data.message,
                  'error'
                )
              }
            },
            erro => {
              this.swalWithBootstrapButtons(
                "Error",
                'Error al realizar el pago',
                'error'
              )
            }
          );     
      } else if (        
        result.dismiss === swal.DismissReason.cancel
      ) {
        // Si se cancela se muestra un mensaje de cancelacion
        this.swalWithBootstrapButtons(
          this.msgConfirmacion.cancel.msgtitle,
          this.msgConfirmacion.cancel.msg,
          'error'
        )
      }
    })   
  }

  // Se busca al empleado por medio de su numero de empleado
  buscarEmpleado(){
    this.submitted = true;  
    if (this.searchForm.invalid) {
        return;
    }
    // Si pasa la validacion consume el provider para llamar al servicio que obtiene el empleado
    this.appService.getEmpleado(this.searchForm.value["numeroempleado"])
    .subscribe(
      data => {
        if(data.status == 1){
          // Si todo fue correcto carga los datos en los controles
          this.numerempleado = data.response[0].inumempl;          
          this.registerForm = this.formBuilder.group({      
            nombre: [{value: data.response[0].cnomempl,disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
            rol: [{value: data.response[0].sdescrol,disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
            tipo: [{value: data.response[0].sdesctipo,disabled: true},[ Validators.required, Validators.pattern(this.letras)]],
            fecha: ['',[ Validators.required]],
            numeroentregas: [{value: 0, disabled: false}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
            checkcubrirturno: [{value: false, disabled: false}, [Validators.required ]],
            checkcubriochofer: [{value: false, disabled: false}, [Validators.required]],
            diasfalto:[{value: 0, disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
            diaschofer:[{value: 0, disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
            checkcargador: [{value: false, disabled: false}, [Validators.required]],
            diascargador: [{value: 0, disabled: false}, [Validators.pattern(this.numerico), Validators.maxLength(2)]],
          });
          this.classpagomensual = "";
          setTimeout(() => {
            M.updateTextFields();
          },1)
          this.subscribirvalor();
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

  // Realizo subscripciones a los cambios en ciertos controles para darle mas funcionalidad a la applicacion
  subscribirvalor(){
    this.registerForm.get('checkcubrirturno').valueChanges.subscribe(val => {
      if(val)
        this.classcubrioturno = "";
      else
        this.classcubrioturno = "hide";
    });

    this.registerForm.get('checkcubriochofer').valueChanges.subscribe(val => {
      if(val)
        this.classdiaschofer = "";
      else
        this.classdiaschofer = "hide";
    });

    this.registerForm.get('checkcargador').valueChanges.subscribe(val => {      
      if(val)
        this.classdiascargador = "";        
      else
        this.classdiascargador = "hide";
    });
  }

  // Regreso a la ruta de registrar empleado en caso de que diga regresar
  back(){
    this.router.navigate(['/create']);
  }
}
