CREATE OR REPLACE FUNCTION fngetempleados()
  RETURNS TABLE(iident integer, inumempl integer, cnomempl text, irol integer, itipo integer, istatus boolean) AS
$BODY$

DECLARE
    
	--_registro	record;
BEGIN	
	return query SELECT id, numeroempleado, nombreempleado, idrol, idtipo, activo	 FROM empleados;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE