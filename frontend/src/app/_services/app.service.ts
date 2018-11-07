import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tipo} from  '../_models/tipo';
import {rol} from '../_models/rol';
import {empleado} from '../_models/empleado';
import {respuesta} from '../_models/respuesta'
import {reporte} from '../_models/reporte'
import { Observable } from 'rxjs';

//Provider que consumira el servicio generado en node Js
@Injectable()
export class Appservice {
    constructor(private http: HttpClient) { }   
    
    // Obtengo los tipos de empleado por medio del servicio
    getTipo(){
        return this.http.get<tipo>("http://localhost:3000/GetTipos");
    }

    // Obtengo los roles del empleado por medio del servicio
    getRol(){
        return this.http.get<rol>("http://localhost:3000/GetRoles");
    }

    // Obtengo los empleados por medio del servicio
    getEmpleados(){
        return this.http.get<empleado>("http://localhost:3000/GetEmpleados");
    }

    // Obtengo un empleado en especifico a travez de su numero de empleado
    getEmpleado(numero){
        return this.http.post<empleado>("http://localhost:3000/GetEmpleado",{
            numeroempleado: numero
        });
    }
    
    //  Guardo el empleado por medio del servicio
    guardarEmpleado(numero: string, nombre: string, rol: string, tipo: string): Observable<any> {  

        return this.http.post<respuesta>("http://localhost:3000/PostEmpleado",{
            numeroempleado: numero,
            nombre: nombre,
            rol: rol,
            tipo: tipo,
        });        
    }

    // Modifico al empleado a travez de su numero de empleado
    modificarEmpleado(numero: string, nombre: string, rol: string, tipo: string): Observable<any> {  

        return this.http.put<respuesta>("http://localhost:3000/PutEmpleado",{
            numeroempleado: numero,
            nombre: nombre,
            rol: rol,
            tipo: tipo,
        });        
    }

    //Se da de baja o se activa a un empleado por medio del servicio
    eliminarEmpleado(numero: string, activo: string): Observable<any> {  
        console.log(activo)
        if(activo === "true")        
            activo = "false";
        else
            activo = "true";

        console.log(activo)
        return this.http.post<respuesta>("http://localhost:3000/DeleteEmpleado",{
            numeroempleado: numero,
            activo: activo
        });
    }

    // Se realiza al servicio generar los calculos y guardar un registro del movimiento en la BD
    pagoMensual(numero: string, fecha: string,cubrio: string, checkchofer: string,
        checkcargador: string, diaschofer: string,diascargador: string,entrega: string, diasfalto: string): Observable<any> {                          
        return this.http.post<respuesta>("http://localhost:3000/PostPagosMensuales",{
            numeroempleado: numero,
            fecha: fecha,
            checkcubrio: cubrio,
            checkchofer: checkchofer,
            checkcargador: checkcargador,
            diaschofer: diaschofer,
            diascargador: diascargador,
            diasfalto: diasfalto,
            numeroentregas: entrega
        });
    }

    // Se obtiene un reporte simple d elos movimientos generados en el mes de todos los empleados 
    // o de uno en especifico
    getReporte(numero, desde, hasta){
        return this.http.post<reporte>("http://localhost:3000/GetReporte",{
            numeroempleado: numero,
            fechadesde: desde,
            fechahasta: hasta
        });
    }
}