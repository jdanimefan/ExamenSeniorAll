import { Component, OnInit } from '@angular/core';
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  roles;
  tipos;
  numerico = /^[0-9]*$/
  letras = /^[ña-zÑA-Z\s]+$/;

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

  constructor(private appService: Appservice,private formBuilder: FormBuilder) { }

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
          else
            console.error(data.message);
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
          else
          console.error(data.message);
        },
        error => {
          console.log(error);
        }
      );
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }      
      this.appService.guardarEmpleado(this.registerForm.value['numeroempleado'],this.registerForm.value['nombre'],this.registerForm.value['radioroles'],this.registerForm.value['radiotipos'])
      .subscribe(
        data => {
          if(data.status == 1)
            console.info(data.message);
          else
            console.error(data.message);
        },
        error => {
          console.error(error);
        }
      );

  }

}
