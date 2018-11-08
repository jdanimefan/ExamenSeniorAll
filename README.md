# ExamenSeniorAll
Proyecto generado en angular, node y posgresql

## Requerimientos:
### Alta de un empleado
Se necesita crear una opción para poder registrar a los empleados que se manejaran en la nomina.
	Los datos a guardar son los siguientes:
  *numero de empleado tipo numérico
  *nombre del empleado tipo texto
  *rol del empleado (se mostrara texto pero se guardara un numero en la BD)
    *Chófer
    *Cargador
    *Auxiliar
  *tipo empleado (se mostrara texto pero se guardara un numero en la BD)
    *Interno
    *Externo
  *El empleado nacerá como activo en la base de datos
  *Al guardar un empleado se necesita validar que no se guarde vació
 
 ### Modificar un empleado.
 
 Se necesita una opción donde se podrá modificar al empleado, los siguientes datos son los que 	deberán modificarse.
    *Nombre del empleado
    *Rol
    *Tipo
    *Estatus
  *Es necesario validar que los campos modificados no se encuentren vacíos

### Dar de baja.
Se necesita una opción donde se dará de baja de forma lógica al empleado
  *Es necesario que aparezca un mensaje de confirmación para dar de baja
  *Si el empleado esta dado de baja, entonces se podra activar de nuevo
  
### Buscar empleados.
  Se necesita tener una opción donde se muestren los empleados con su siguiente información
    *Numero De Empleado
    *Nombre
    *Rol
    *Tipo
    *Estatus (Se mostrara si el usuario esta activo o dado de baja)
  *Debe de haber una opción para poder filtrar los empleados por numero y nombre de empleado
  *las opciones de modificar debe de poder accederse a travez de  de la tabla
### Captura de salario mensual
  Se necesita la opción de capturar el salario del empleado.
  *Es necesario colocar el numero de empleado y buscarlo en la base de datos.
  *Si encuentra al empleado mostrara la siguiente información.
      *Nombre del empleado (No editable)
      *Rol (No editable)
      *Tipo (No editable)
      *Fecha (editable)
      *Cantidad de entregas (Numero de entregas que realizo en el mes el empleado)( editable)
      *Dias que falto en el mes
  *Si no encontró al empleado mostrara un mensaje informando (No se encontró al empleado : “Numero de empleado”).
  *Si el rol del empleado es auxiliar aparecerá una opción extra donde seleccionara si cubrió algún puesto.
  *Si se selecciona al auxiliar que cubrió el puesto de otro rol se ocupara capturar la cantidad días que cubrió
  *Los trabajadores tienen un sueldo base de $30 pesos la hora.
  *La jornada laboral es de 8 horas.
  *El calculo del mes sera en base a 30 días por mes
  *Los empleados que tengan el rol de chófer ganaran un bono de $10 pesos de bono por hora.
  *Los empleados que tengan el rol de cargador ganaran un bono de $5 pesos de bono por hora.
  *Los empleados con el rol de auxiliar no recibirán ningún bono extra.
  *Al cubrir un puesto el auxiliar ganara el bonus del puesto correspondiente chofer = $10 pesos, cargador $5 pesos.
  *El ISR retenido al empleado es del 9%.
  *Si un empleado gana mas de $16000 se le debe retener un 3% adicional de ISR.
  *Los empleados internos (no aplica para los de tipo externos) reciben un 4% sobre su sueldo mensual en vales de despensa, 
  esto debe calcularse antes de retener los impuestos.
  *Se capturara la fecha del dia en el que se calculo el salario mensual
  *Al realizar el pago se mostrara un mensaje de cuanto se le pagara al usuario y el isr retenido
  
  ### Reporte de los movimientos generados
  Es necesaria una opción donde se mostrara los movimientos que se generaron del mes
	Se filtrara los movimientos por fecha
	En la tabla de mostrara la siguiente informacion
		*numero del empleado
		*nombre del empleado
		*total pagado
		*ISR retenido
		*Entregas
		*Horas trabajadas	
