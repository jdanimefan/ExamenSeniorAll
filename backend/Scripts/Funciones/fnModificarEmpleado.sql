CREATE OR REPLACE FUNCTION  fnModificarEmpleado(iNumeroEmpleado integer, cNombreEmpleado text, iIdRol integer, iIdTipo integer)
  RETURNS integer AS
$func$
BEGIN
	UPDATE empleados SET nombreempleado = cNombreEmpleado, idrol = iIdRol, idtipo = iIdTipo where numeroempleado = iNumeroEmpleado;
	IF FOUND THEN
		RETURN 1;
	ELSE
		RETURN 0;
	END IF;
END
$func$  LANGUAGE plpgsql;

