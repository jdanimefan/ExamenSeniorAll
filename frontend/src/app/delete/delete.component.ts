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
  searchForm: FormGroup;
  submitted = false;  
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
  numerico = /^[0-9]*$/
  letras = /^[ña-zÑA-Z\s]+$/;  
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
  classcubrioturno = "hide";
  classpagomensual = "hide";
  classdiascargador = "hide";
  classdiaschofer = "hide";
  classvaliddiaschofer = '';
  classvaliddiascargador = '';
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

      if(fecha.getDate() < 10)
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-0" + fecha.getDate();
      else
      fechacompleta = fecha.getFullYear() + "-" + (fecha.getMonth()+1) +"-" + fecha.getDate();

      // remuevo y agrego fecha para que tome correctamente el valor de fecha en el reactive form
      this.registerForm.removeControl('fecha');
      this.registerForm.addControl('fecha', new FormControl(fechacompleta, [Validators.required]));
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

  ngOnInit() {
    let elems = document.querySelectorAll('.datepicker');
    let instances = M.Datepicker.init(elems, this.options);
    this.cargarempleado();
    setTimeout(() => {
      M.updateTextFields();
    },1)
  }

  cargarempleado()
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
  get s() { return this.searchForm.controls; }
  get f() { return this.registerForm.controls; }
  
  onSubmit(){
    this.submitted = true;
    console.log(this.registerForm.value)    
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

            }
          );     
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons(
          this.msgConfirmacion.cancel.msgtitle,
          this.msgConfirmacion.cancel.msg,
          'error'
        )
      }
    })   
  }

  buscarEmpleado(){
    this.submitted = true;  
    if (this.searchForm.invalid) {
        return;
    }
    this.appService.getEmpleado(this.searchForm.value["numeroempleado"])
    .subscribe(
      data => {
        if(data.status == 1){
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

  back(){
    this.router.navigate(['/create']);
  }
}
