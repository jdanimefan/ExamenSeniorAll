# Rinku-Nomina
Proyecto generado en angular, node y posgresql
  
## Requerimientos:
### Alta de un empleado

Se necesita crear una opción para poder registrar a los empleados que se manejaran en la nomina.
* Los datos a guardar son los siguientes:
  * numero de empleado tipo numérico
  * nombre del empleado tipo texto
  * rol del empleado (se mostrara texto pero se guardara un numero en la BD)
    * Chófer
    * Cargador
    * Auxiliar
  * tipo empleado (se mostrara texto pero se guardara un numero en la BD)
    * Interno
    * Externo
 * El empleado nacerá como activo en la base de datos
 * Al guardar un empleado se necesita validar que no se guarde vació
 
 ### Modificar un empleado.
 
 Se necesita una opción donde se podrá modificar al empleado, 
 
 * los siguientes datos son los que deberán modificarse.
    * Nombre del empleado
    * Rol
    * Tipo
    * Estatus
  * Es necesario validar que los campos modificados no se encuentren vacíos

### Dar de baja.
Se necesita una opción donde se dará de baja de forma lógica al empleado
  * Es necesario que aparezca un mensaje de confirmación para dar de baja
  * Si el empleado esta dado de baja, entonces se podra activar de nuevo
  
### Buscar empleados.
  * Se necesita tener una opción donde se muestren los empleados con su siguiente información
    * Numero De Empleado
    * Nombre
    * Rol
    * Tipo
    * Estatus (Se mostrara si el usuario esta activo o dado de baja)
  * Debe de haber una opción para poder filtrar los empleados por numero y nombre de empleado
  * las opciones de modificar debe de poder accederse a travez de  de la tabla
### Captura de salario mensual
  Se necesita la opción de capturar el salario del empleado.
  
  * Es necesario colocar el numero de empleado y buscarlo en la base de datos.
  * Si encuentra al empleado mostrara la siguiente información.
      * Nombre del empleado (No editable)
      * Rol (No editable)
      * Tipo (No editable)
      * Fecha (editable)
      * Cantidad de entregas (Numero de entregas que realizo en el mes el empleado)( editable)
      * Dias que falto en el mes
  * Si no encontró al empleado mostrara un mensaje informando (No se encontró al empleado : “Numero de empleado”).
  * Si el rol del empleado es auxiliar aparecerá una opción extra donde seleccionara si cubrió algún puesto.
  * Si se selecciona al auxiliar que cubrió el puesto de otro rol se ocupara capturar la cantidad días que cubrió
  * Los trabajadores tienen un sueldo base de $30 pesos la hora.
  * La jornada laboral es de 8 horas.
  * El calculo del mes sera en base a 30 días por mes
  * Los empleados que tengan el rol de chófer ganaran un bono de $10 pesos de bono por hora.
  * Los empleados que tengan el rol de cargador ganaran un bono de $5 pesos de bono por hora.
  * Los empleados con el rol de auxiliar no recibirán ningún bono extra.
  * Al cubrir un puesto el auxiliar ganara el bonus del puesto correspondiente chofer = $10 pesos, cargador $5 pesos.
  * El ISR retenido al empleado es del 9%.
  * Si un empleado gana mas de $16000 se le debe retener un 3% adicional de ISR.
  * Los empleados internos (no aplica para los de tipo externos) reciben un 4% sobre su sueldo mensual en vales de despensa, 
  esto debe calcularse antes de retener los impuestos.
  * Se capturara la fecha del dia en el que se calculo el salario mensual
  * Al realizar el pago se mostrara un mensaje de cuanto se le pagara al usuario y el isr retenido
  
  ### Reporte de los movimientos generados
Es necesaria una opción donde se mostrara los movimientos que se generaron del mes.
* Se filtrara los movimientos por fecha
* En la tabla de mostrara la siguiente informacion	
	* numero del empleado
	* nombre del empleado
	* total pagado
	* ISR retenido
	* Entregas
	* Horas trabajadas

## Entradas:
* Número de empleado
* Nombre del empleado
* Rol
* Tipo
* Fecha
* Cantidad de entregas
* Cubrió turno
* Días cubiertos
* Dias que se falto

## Procesos:
* Alta de empleados
* Baja de empleados
* Modificar empleados
* Buscar empleados
* Capturar salarios mensuales por empleado

## Salidas:
* Mensajes de confirmación
* Mensajes de error
* Reporte

## Diagrama de Clases
![GitHub Logo](/documentacion/DiagramaDeClases/DiagramaDeClases.png)

## Diagrama de Objetos
 Objeto empleado representado en sus posibles estados de rol como chofer, cargador o auxiliar y siendo ya sea tipo externo o interno
![GitHub Logo](/documentacion/DiagramaDeObjetos/DiagramaDeObjetos.png)

## Diagrama de Secuencia
![GitHub Logo](/documentacion/DiagramasDeSecuencia/DiagramaSecuenciaInsertarEmpleado.png)
![GitHub Logo](/documentacion/DiagramasDeSecuencia/DiagramaSecuenciaModificarEmpleado.png)
![GitHub Logo](/documentacion/DiagramasDeSecuencia/DiagramaSecuenciaEliminarEmpleado.png)
![GitHub Logo](/documentacion/DiagramasDeSecuencia/DiagramaSecuenciaSalarioMensual.png)

## Diagrama de Casos de Uso
![GitHub Logo](/documentacion/DiagramaCasosDeUso/DiagramaCasoDeUsoInsertarEmpleado.png)
![GitHub Logo](/documentacion/DiagramaCasosDeUso/DiagramaCasoDeUsoModificarEmpleado.png)
![GitHub Logo](/documentacion/DiagramaCasosDeUso/DiagramaCasoDeUsoEliminarEmpleado.png)
![GitHub Logo](/documentacion/DiagramaCasosDeUso/DiagramaCasoDeUsoCalcularSalario.png)



## Arquitectura
* Frameworks y base de datos utilizados para generar el proyecto
	* npm          Version 6.4.1
	* node js      Version 10.11.0
	* pgAdmin      Version 1.18.1
	* PostgreSQL   Version 9.3.24 , compiled by Visual C++ build 1600, 64-bit"
	* nodemon      Version 1.18.5
	* pm2          Version 3.2.2
	* @angular/cli Version 7.0.3
	
* Para probarlo despues de buildear el proyecto de angular se utilizo 
	* Stack wampserver 3.0.6 64 bit.
### Ambientación del FrontEnd
1. Instalar todos los frameworks y herramientas mencionadas 
	1.1 Si solo se desea ver la aplicación solo es necesario tener PostgreSQL, pgAdmin (ya viene integrado al instalar PostgreSQL), node js, pm2.
2. Descargar el repositorio.
	Si solo se desea obtener la vista es necesario tomarlo de la carpeta dist localizada en la ruta frontend/dist de el repositorio de gitlab. 

* Para poder correr el proyecto utilizar algun stack por ejemplo wampserver.

3.  Se instala wampserver.
4. Localizar la carpeta www dentro de wampserver y colocar la carpeta llamada examenFronEnd que se tomo de la carpeta dist.
5. Correr wampserver.
6. Obtener tu ip y modificar la el archivo index.html localizado en la carpeta examenFronEnd y modificar la linea  <base href="http://proyecto/"> por <base href="http://tuip/examenFronEnd/"> de esta manera sabra donde leerla los arhcivos que necesita el proyecto.

		* Entrar a la ruta  
			http://tuip/examenFronEnd/

		* Ejemplo 
			http://10.26.180.117/examenFronEnd/

Si todo esta correcto te mostrara la aplicación pero aun necesitas correr el servicio de backend para el proyecto

### Ambientacion BackEnd

7. Como no se uso un servidor por motivos de no tener uno que soporte node, se opto por utilizarlo localmente node utilizando la herramienta pm2
8. Del repositorio localizar la carpeta backend y entrar a travez de cmd(simbolo del sistema) y correr el siguiente comando.

		pm2 start index.js –name ‘NombreParaIdentificarlo’

9. Con el siguiente comando podras verificar que tu servicio  este inicializado.

		pm2 list
### Ambientando la Base de Datos

10. Solo sera necesario crear la base de datos para  PostgreSQL

11. Crear una base de datos por medio de pgadmin con el nombre de proyectoexamen

12. correr todos los scripts colocados en la carpeta Scripts localizada en el repositorio, Es necesario primero ejecutar el scripts tablas.sql loclaizada en la carpeta Scripts/Tablas, ejecutar el script insert.sql localizada en la carpeta Scripts/insert y por ultimo todas las funciones que se encuentren en la carpeta /Scripts/Funciones.

13. Modificar el archivo de conexión llamado config.json localizado en la carpeta backend/config/config.json, colocandole la base de datos creada y la informacion para la conexión en el arreglo llamado production

Ejemplo


	 "production": {
		"config_id": "production",
		"app_name": "Back-End-Examen-Produccion",
		"node_port": 3000,
		"database": {
		    "user": "postgres",
		    "host": "localhost",
		    "database": "proyectoexamen",
		    "password": "1234567",
		    "port": 5432
		}    
	    }   
