CREATE OR REPLACE FUNCTION fngetempleados(numeroempleadoparam integer)
  RETURNS TABLE(iident integer, inumempl integer, cnomempl text, irol integer,sDescTipo text,sDescrol text, itipo integer, istatus boolean) AS
$BODY$

DECLARE
    
	--_registro	record;
BEGIN	
	IF numeroempleadoparam = 0 THEN
		return query 
		SELECT E.id, E.numeroempleado, E.nombreempleado, E.idrol, T.descripciontipo, R.descripcionrol, E.idtipo, E.activo FROM empleados AS E
		inner join tipo AS T ON T.tipo = E.idtipo
		inner join rol AS R ON R.rol = E.idrol;
	ELSE
		return query 
		SELECT E.id, E.numeroempleado, E.nombreempleado, E.idrol, T.descripciontipo, R.descripcionrol, E.idtipo, E.activo FROM empleados AS E
		inner join tipo AS T ON T.tipo = E.idtipo
		inner join rol AS R ON R.rol = E.idrol AND numeroempleado = numeroempleadoparam;
	END IF;
	
END;
$BODY$
  LANGUAGE plpgsql VOLATILE