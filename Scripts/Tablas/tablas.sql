CREATE TABLE empleados
(
	id serial NOT NULL,
	numeroempleado integer NOT NULL,
	nombreempleado text,
	idrol integer NOT NULL,
	idtipo integer NOT NULL,	
	activo boolean DEFAULT true,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);


CREATE TABLE tipo
(
	id serial NOT NULL,
	tipo integer NOT NULL,
	descripciontipo text not null,
	activo boolean DEFAULT true,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()	
);

CREATE TABLE rol
(
	id serial NOT NULL,
	rol integer NOT NULL,
	descripcionrol text NOT NULL,
	activo boolean DEFAULT true,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);


CREATE TABLE pagos
(
	id serial NOT NULL,
	numeroempleado integer NOT NULL,
	auxiliarchofer boolean NOT NULL,
	diaschofer smallint NOT NULL,
	auxiliarcargador boolean NOT NULL,
	diascargador smallint NOT NULL,
	monto float NOT NULL,
	isrretenido float NOT NULL,
	bonoenvales float NOT NULL,
	horastrabajadas int NOT NULL,
	entregas int NOT NULL,
	diasfalto int NOT NULL,
	fecha date,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE bonos
(
	id serial NOT NULL,
	idrol integer NOT NULL,
	descripcionbono text,
	bono float NOT NULL,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE sueldos
(
	id serial NOT NULL,
	idsueldo integer NOT NULL,
	descripcionsueldo text NOT NULL,
	sueldo float NOT NULL,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE config
(
	id serial NOT NULL,
	parametro int NOT NULL,
	descripcionconfig text NOT NULL,
	valor text NOT NULL,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE isr
(
	id serial NOT NULL,
	isr integer NOT NULL,
	descripcionisr text NOT NULL,
	valor int NOT NULL,
	fechamovto timestamp with time zone NOT NULL DEFAULT now()
);