-- Function: obtenermonto(integer, smallint, smallint, smallint, smallint, smallint, smallint, date)

-- DROP FUNCTION obtenermonto(integer, smallint, smallint, smallint, smallint, smallint, smallint, date);

CREATE OR REPLACE FUNCTION obtenermonto(IN integer, IN smallint, IN smallint, IN smallint, IN smallint, IN smallint, IN smallint, IN date, OUT fpagototal double precision, OUT fmontodespensa double precision, OUT fisrret double precision, OUT fisrretadc double precision)
  RETURNS record AS
$BODY$
DECLARE

	lEmpleado 		   		ALIAS FOR $1;
	iAuxiliarchofer	 	            	ALIAS FOR $2;
	iDiaschofer		            ALIAS FOR $3;
	iAuxiliarCargador 	            ALIAS FOR $4;
	iDiascargador	 	            ALIAS FOR $5;
	iEntregas	 	            ALIAS FOR $6;
	iDiasfalto	 	            ALIAS FOR $7;
	tFecha		 	            ALIAS FOR $8;

	iIdrol				INT4 DEFAULT 0;
	iIdtipo				INT4 DEFAULT 0;
	iDiasTrabajo			INT4 DEFAULT 0;
    iSalarioXhora				INT4 DEFAULT 0;
	lSueldobase			INT4 DEFAULT 0;
	lBonoentrega			INT4 DEFAULT 0;
	lBonorol			INT4 DEFAULT 0;
	lTotalBono			INT4 DEFAULT 0;
	lBonoaux			INT4 DEFAULT 0;
	lTotalBonoAux			INT4 DEFAULT 0;
	lIsr			INT4 DEFAULT 0;
	lSueldoMensual			INT4 DEFAULT 0;
	--lPagoTotal			INT4 DEFAULT 0;
	lPorcentajedesp			FLOAT DEFAULT 0;
	--lMontodespensa			INT4 DEFAULT 0;
	lImportesEntrega			INT4 DEFAULT 0;
	fPagoTotalAdi			FLOAT DEFAULT 0;
	
BEGIN

	fpagototal = 0;
	fmontodespensa = 0;
	fIsrret = 0;
	fIsrretAdc= 0;
    -- Obtengo el rol y tipo de empleado por medio de su numero empleado
	SELECT idrol,idtipo INTO iIdrol, iIdtipo from empleados where numeroempleado = lEmpleado;
    -- Obtengo el sueldo base x hora 
    SELECT sueldo INTO iSalarioXhora from sueldos where idsueldo = 1;

    -- Obtengo los dias reales trabajados restando los dias que falto
	iDiasTrabajo = 30 - iDiasfalto;

    -- Obtengo el sueldo base ganado real al mes
	lSueldobase = ( iSalarioXhora * 8 ) * iDiasTrabajo;
    raise notice 'sueldo base; %',lSueldobase;

raise notice 'salario x hora %',iSalarioXhora;

	IF iEntregas > 0 THEN
        -- Se obtiene cuanto se gana por entrega
		SELECT valor::integer INTO lBonoentrega FROM config WHERE parametro = 1;
        -- Se obtiene las ganancias por entega del empleado
		lImportesEntrega = lBonoentrega * iEntregas;
	END IF;
    
    -- Obtengo el cuanto se le paga de bono x hora al empleado dependiendo de su rol
	SELECT bono INTO lBonorol FROM bonos WHERE idrol = iIdrol;
   
    -- Se obtiene el bono a pagar al empleado por medio de el calculo de horas trabajadas * bono
	lTotalBono =  (iDiasTrabajo * 8) * lBonorol;
raise notice 'bonos por rol: %',lTotalBono;

    -- Si el rol es Auxiliar y alguno de los dos flags esta esta en 1 (true), Esto
    -- significa que apoyo como Chofer o Cargador
	IF iIdrol = 3 AND (iAuxiliarchofer = 1 OR iAuxiliarCargador = 1) THEN
        --Si apoyo como chofer el auxiliar recibira el bono x hora que obtiene un chofer
		IF iAuxiliarchofer = 1 THEN
			SELECT bono INTO lBonoaux FROM bonos WHERE idrol = 1;
			lTotalBonoAux = ( iDiaschofer * 8 ) * lBonoaux;
            raise notice 'bono por chofer %',lTotalBonoAux;
		END IF;

        --Si apoyo como cargador el auxiliar recibira el bono x hora que obtiene un chofer
		IF iAuxiliarCargador = 1 THEN
			SELECT bono INTO lBonoaux FROM bonos WHERE idrol = 1;
			lTotalBonoAux = lTotalBonoAux + ( iDiascargador * 8 ) * lBonoaux;
            raise notice 'bono por cargador %',( iDiascargador * 8 ) * lBonoaux;
            raise notice 'bono por auxiliar total %',lTotalBonoAux;
		END IF;
	END IF;

    --Se obtiene el ISR base retenido
	SELECT 100 - valor INTO lIsr from isr where isr = 1;
    
    -- Se obtiene el sueldo mensual base sumando los bonos
	lSueldoMensual = lSueldobase + lImportesEntrega + lTotalBono + lTotalBonoAux;
    raise notice 'entregas bono: %', lImportesEntrega;
    -- Se obtiene el pago mensual con el ISR aplicado
	fPagoTotal = lSueldoMensual::float * ( lIsr::float / 100::float );
    -- Se obtiene el ISR que se le retubo al empleado
	fIsrret = lSueldoMensual::float - fPagoTotal;
	
raise notice 'Sueldo Con Isr %  Sueldo Sin Isr %',fPagoTotal,lSueldoMensual;
raise notice 'ISR retenido %',fIsrret;
    -- Si el sueldo mensual es mayor a 16000 se le aplicara adicionalmente un cargo adicional
	IF lSueldoMensual > 16000 THEN
        -- Se obtiene la cantidad adicional que se retendra
		SELECT 100 - valor INTO lIsr from isr where isr = 2;

        -- Se calcula el isr Adicional que s ele retendra al empleado
		fPagoTotalAdi = (fPagoTotal * ( lIsr::float / 100::float ));		
		fIsrretAdc = fPagoTotal - fPagoTotalAdi;
        fPagoTotal = fPagoTotalAdi;
        raise notice'Sueldo Con Isr Adicional %  Sueldo Sin Adicional Isr%',fPagoTotal,fIsrretAdc;
        raise notice 'ISR retenido Adicional %',fIsrretAdc;
	END IF;
	
    -- Si el empleado es Interno recibira un bono de despensa
	IF iIdtipo = 1 THEN
        --Se obtiene el cuanto se le da del bono al empleado
		SELECT valor::integer INTO lPorcentajedesp FROM config WHERE parametro = 2;
        -- Se calcula el bono x despensa Antes de impuestos
		fMontodespensa =  (lSueldoMensual * lPorcentajedesp / 100)::float;
        raise notice 'bono x despensa %',fMontodespensa;
	END IF;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE