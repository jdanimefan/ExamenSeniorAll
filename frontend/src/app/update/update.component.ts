import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2/dist/sweetalert2.js'
import {Appservice} from '../_services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as M from '../../assets/materialize/js/materialize.min.js';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

// Componente que modifica y elimina/desactiva un empleado
export class UpdateComponent implements OnInit {

  // Css para los botones de sweet alert2
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn green lighten-2 waves-effect waves-light',
    cancelButtonClass: 'btn red lighten-2 waves-effect waves-light',
    buttonsStyling: false,
  })

  // reactive forms
  registerForm: FormGroup;
  submitted = false;

  //Declaracion d evariables
  roles;
  tipos;
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

  // Mensajes y estilos para la alertas y botones
  msgbtnactivo : string = 'Eliminar';
  msgiconactivo : string = 'delete';
   
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
  

// Objeto con los mensajes cuando se validne los reactive forms
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
    'radioroles': [
      { type: 'required', message: 'El rol es requerido' }
    ],
    'radiotipos': [
      { type: 'required', message: 'El tipo es requerido' },
    ]    
    }

  constructor(private router: Router,private appService: Appservice,private formBuilder: FormBuilder) { }

  //Valida que traiga un empleado seleccionado, carga la info de los tipos de empleado,
  // roles y carga al empleado
  ngOnInit() {
    if(!localStorage.getItem('numeroempleado'))
    {
      this.router.navigate(['/search']);
    }
    this.cargarTipos();
    this.cargarempleado();
    setTimeout(() => {
      M.updateTextFields();
    },1)    
  }

  //Desactiva o activa a un empleado
  desactivar(){    
    this.swalWithBootstrapButtons({
      title: this.msgDelete.eliminarmsgtitle,
      text: this.msgDelete.eliminarmsg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        // Si se confirmo la activacion o eliminacion se consume el servicio del provider
        let empleado = this.registerForm.getRawValue();        
        this.appService.eliminarEmpleado(empleado.numeroempleado, this.empleado.istatus.toString())
        .subscribe(
          data => {
            if(data.status == 1)
            {
              this.swalWithBootstrapButtons(
                this.msgDelete.accept.msgtitle,
                data.message,
                'success'
              )
              this.router.navigate(['/search']);
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
          error => {
            this.swalWithBootstrapButtons(
              "Error",
              "Ocurrio un error al " + this.msgDelete.eliminarmsgtitle +" el empleado",
              'error'
            )
          }
        );       
      } else if (        
        result.dismiss === swal.DismissReason.cancel
      ) {        
        this.swalWithBootstrapButtons(
          this.msgDelete.cancel.msgtitle,
          this.msgDelete.cancel.msg,
          'error'
        )
      }
    })
  }

  // Carga la info del empleado
  cargarempleado()
  {
    this.empleado = JSON.parse(localStorage.getItem("numeroempleado"));    
    this.registerForm = this.formBuilder.group({
      numeroempleado: [{value: this.empleado.inumempl, disabled: true}, [Validators.required, Validators.pattern(this.numerico), Validators.maxLength(10)]],
      nombre: [this.empleado.cnomempl,[ Validators.required, Validators.pattern(this.letras)]],
      radioroles: [this.empleado.irol,[ Validators.required]],
      radiotipos: [this.empleado.itipo,[ Validators.required]]
    });

    // Si el estadus del empleado esta desactivado cmabia el texto del boton a activar
    if(!this.empleado.istatus)
    {
      this.msgDelete.accept.msgtitle = "Activado";
      this.msgDelete.eliminarmsgtitle = "Activar";
      this.msgDelete.eliminarmsg = '¿Esta seguro de que desea activar al empleado?';
      this.btndeletecolor = 'teal lighten-3 waves-effect waves-light btn-large right';
      this.msgbtnactivo = 'Activar';
      this.msgiconactivo  = 'add';
    }    
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
              "Error",
              data.message,
              'error'
            )
          }
        },
        error => {
          this.swalWithBootstrapButtons(
            "Error",
            "Ocurrio un error al obtener los tipos de empleado",
            'error'
          )
      });

    // cargando los roles del empleado
    this.appService.getRol()
      .subscribe(
        data => {
          if(data.status == 1)
          this.roles = data.response;
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
            "Ocurrio un error al obtener los roles del empleado",
            'error'
          )
        }
      );
  }

  get f() { return this.registerForm.controls; }
  // Se valida la informacion con reactive forms y se manda modificar el empleado 
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }

    // Si la informacion paso la validacion se manda a consumir el provider para actualizar al empleado
    let empleado = this.registerForm.getRawValue();    
    this.appService.modificarEmpleado(empleado.numeroempleado,empleado.nombre,empleado.radioroles,
      empleado.radiotipos)
    .subscribe(
      data => {
        if(data.status == 1){
          this.swalWithBootstrapButtons(
            "Modificado",
            data.message,
            'success'
          )
          this.router.navigate(['/search']);
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
          "Ocurrio un error al modificar al empleado",
          'error'
        )
      }
    );
}

// Si da regresar volvera al componente de buscar
back(){    
  this.router.navigate(['/search']);
}

}
