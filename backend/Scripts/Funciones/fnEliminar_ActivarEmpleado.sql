CREATE OR REPLACE FUNCTION  fnEliminar_ActivarEmpleado(iNumeroEmpleado integer, iActivo boolean)
  RETURNS integer AS
$func$
BEGIN
	UPDATE empleados SET activo = iActivo where numeroempleado = iNumeroEmpleado;
	IF FOUND THEN
		RETURN 1;
	ELSE
		RETURN 0;
	END IF;
END
$func$  LANGUAGE plpgsql;