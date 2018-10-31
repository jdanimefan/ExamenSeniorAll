CREATE OR REPLACE FUNCTION  fnRegistrarEmpleado(iNumeroEmpleado integer, cNombreEmpleado text, iIdRol integer, iIdTipo integer)
  RETURNS integer AS
$func$
BEGIN

	PERFORM numeroempleado FROM empleados WHERE numeroempleado = iNumeroEmpleado;
	IF FOUND THEN
		RETURN 2;
	ELSE
		INSERT INTO empleados(numeroempleado, nombreempleado, idrol, idtipo)
		VALUES (iNumeroEmpleado, cNombreEmpleado, iIdRol, iIdTipo);
		IF FOUND THEN
			RETURN 1;
		ELSE
			RETURN 0;
		END IF;
	END IF;
	
END
$func$  LANGUAGE plpgsql;
