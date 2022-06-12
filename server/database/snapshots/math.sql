CREATE TABLE public.math(
	id integer NOT NULL,
	operando1 integer NOT NULL,
	operando2 integer NOT NULL,
	resultado integer NOT NULL,
	operador character varying NULL,
	CONSTRAINT math_pkey PRIMARY KEY (id) 
	)
	