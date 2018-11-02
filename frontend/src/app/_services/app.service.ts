import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {tipo} from  '../_models/tipo';
import {rol} from '../_models/rol';
import {empleado} from '../_models/empleado';
import {respuesta} from '../_models/respuesta'

import { Observable } from 'rxjs';
@Injectable()
export class Appservice {
    constructor(private http: HttpClient) { }   
    
    
    verificarHuella(username: string, template: string): Observable<any> {
        var myFormData = new FormData();
        myFormData.append('template', template);
        myFormData.append('numemp', username);
        return this.http.post<string>("http://10.44.65.16/clicktocall/php/validahuella_wg.php",myFormData);        
        //localStorage.setItem('currentemploye', JSON.stringify(user));       
    }

    getTipo(){
        return this.http.get<tipo>("http://localhost:3000/GetTipos");
    }

    getRol(){
        return this.http.get<rol>("http://localhost:3000/GetRoles");
    }

    getEmpleados(){
        return this.http.get<empleado>("http://localhost:3000/GetEmpleados");
    }

    
    guardarEmpleado(numero: string, nombre: string, rol: string, tipo: string): Observable<any> {  

        return this.http.post<respuesta>("http://localhost:3000/PostEmpleado",{
            numeroempleado: numero,
            nombre: nombre,
            rol: rol,
            tipo: tipo,
        });        
    }

    modificarEmpleado(numero: string, nombre: string, rol: string, tipo: string): Observable<any> {  

        return this.http.put<respuesta>("http://localhost:3000/PutEmpleado",{
            numeroempleado: numero,
            nombre: nombre,
            rol: rol,
            tipo: tipo,
        });        
    }

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


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}