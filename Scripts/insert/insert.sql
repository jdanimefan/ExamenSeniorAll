INSERT INTO tipo(tipo,descripciontipo)
	VALUES 	(1,'Interno'),
		(2,'Externo');


INSERT INTO rol(rol,descripcionrol)
	VALUES 	(1,'Chofer'),
		(2,'Cargador'),
		(3,'Auxiliar');

INSERT INTO sueldos(idsueldo,descripcionsueldo, sueldo)
	VALUES 	(1,'Sueldo Base X Hora',30);

INSERT INTO bonos(idrol, descripcionbono, bono)
	VALUES 	(1, 'Bono X Hora Chofer', 10),
		(2, 'Bono X Hora Cargador', 5),
		(3, 'Bono X Hora Auxiliar', 0);
		
INSERT INTO isr(isr, descripcionisr, valor)
	VALUES 	(1, 'ISR <=16000', 9),
		(2, 'ISR >16000', 12);

INSERT INTO config(
            parametro, descripcionconfig, valor)
	VALUES 	(1,'Bono X Cada Entrega', '5'),
		(2,'% Bono X Vales De Despensa(Solo Internos)', '4');
