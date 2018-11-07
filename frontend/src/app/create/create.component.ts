import { Component, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2/dist/sweetalert2.js'

//Se Crea un componente que se encargara de dar de alta y validar a un empleado
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  // Regex
  numerico = /^[0-9]*$/
  letras = /^[ña-zÑA-Z\s]+$/;

  // Reactive Forms y submit flag
  registerForm: FormGroup;
  submitted = false;

  // objeto para los tipos y roles 
  roles;
  tipos;
  
  // mensajes para los reactive forms
  account_validation_messages = {
      'numeroempleado': [
        { type: 'required', message: 'el numero de empleado es requerido' },
        { type: 'minlength', message: '' },
        { type: 'maxlength', message: 'Maximo 10 digitos' },
        { type: 'pattern', message: 'Tu numero de empleado solo puede contener numeros' },
        { type: 'validUsername', message: '' }
      ],
      'nombre': [
        { type: 'required', message: 'El nombre es requerido' },
        { type: 'minlength', message: '' },
        { type: 'maxlength', message: 'Maximo 50 caracteres' },
        { type: 'pattern', message: 'Tu nombre solo puede contener letras y espacios' },
        { type: 'validUsername', message: '' }
      ],
      'radioroles': [
        { type: 'required', message: 'El rol es requerido' }
      ],
      'radiotipos': [
        { type: 'required', message: 'El tipo es requerido' },
      ],
      'terms': [
        { type: 'pattern', message: 'You must accept terms and conditions' }
      ]
    }

    // sweet alert se agregan estilos para los botones
    swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
      cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
      buttonsStyling: false,
    })

  constructor(private appService: Appservice,private formBuilder: FormBuilder) { }

  // inicializacion del reactive form y carga de tipos y roles
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      numeroempleado: ['', [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      nombre: ['',[ Validators.required, Validators.pattern(this.letras)]],
      radioroles: ['',[ Validators.required]],
      radiotipos: ['',[ Validators.required]]
    });
    this.cargarTipos();
  }

  cargarTipos(){
    // cargando los tipos de empleado
    this.appService.getTipo()
      .subscribe(
        data => {
          if(data.status == 1)
            this.tipos = data.response;
          else{
            this.swalWithBootstrapButtons(
              'Error',
              data.message,
              'error'
            );
          }                      
        },
        error => {            
          this.swalWithBootstrapButtons(
            'Error',
            'Error al cargar los tipos de empleado',
            'error'
          );
      });

    // Cargando los roles del empleado
    this.appService.getRol()
      .subscribe(
        data => {
          if(data.status == 1)
          this.roles = data.response;
          else{
            this.swalWithBootstrapButtons(
              'Error',
              data.message,
              'error'
            );
          }
        },
        error => {
          this.swalWithBootstrapButtons(
            'Error',
            'Error al cargar los roles',
            'error'
          );
        }
      );
  }

  get f() { return this.registerForm.controls; }

  // Envio de datos y validacion
  onSubmit() {
      this.submitted = true;      
      if (this.registerForm.invalid) {
          return;
      }
      // Se consume el provider para consumir el servicio de guardado de empleado
      this.appService.guardarEmpleado(this.registerForm.value['numeroempleado'],this.registerForm.value['nombre'],this.registerForm.value['radioroles'],this.registerForm.value['radiotipos'])
      .subscribe(
        data => {
          if(data.status == 1){
            this.swalWithBootstrapButtons(
              'Registrado',
              data.message,
              'success'
            );
          }
          else{
            this.swalWithBootstrapButtons(
              'Error',
              data.message,
              'error'
            );
          }
        },
        error => {
          this.swalWithBootstrapButtons(
            'Error',
            'Ocurrio un erro al guardar el empleado',
            'error'
          );
        }
      );
  }
}
