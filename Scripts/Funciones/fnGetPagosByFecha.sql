CREATE OR REPLACE FUNCTION fnGetPagosByFecha( numempl integer , fechadesde  date , fechahasta date )
  RETURNS table(iident integer,iNumempl integer, tNomempl text, bAuxchofer bool, iDiaschofer integer, bAuxcargador bool, iDiascargador integer, iMonto float, iIsrretenido float, iBonoenvales float, iHorastrabajadas integer, iEntregas integer,dFecha date) AS
$BODY$
BEGIN	
	IF numempl = 0 THEN	
		return query SELECT a.id, a.numeroempleado, b.nombreempleado, a.auxiliarchofer, a.diaschofer::integer, a.auxiliarcargador, a.diascargador::integer,a.monto,a.isrretenido, a.bonoenvales, a.horastrabajadas, a.entregas,a.fecha 
		FROM pagos a, empleados b WHERE a.numeroempleado = b.numeroempleado AND (a.fechamovto::date BETWEEN fechadesde AND fechahasta);
	ELSE
		return query SELECT a.id, a.numeroempleado, b.nombreempleado, a.auxiliarchofer, a.diaschofer::integer, a.auxiliarcargador, a.diascargador::integer,a.monto,a.isrretenido, a.bonoenvales, a.horastrabajadas, a.entregas,a.fecha
		FROM pagos a, empleados b WHERE a.numeroempleado = b.numeroempleado AND a.numeroempleado = numempl AND( a.fechamovto::date BETWEEN fechadesde AND fechahasta );
	END IF;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE