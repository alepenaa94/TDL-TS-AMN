CREATE TABLE public.player(
	id integer NOT NULL DEFAULT nextval('player_id_seq'::regclass),
	score integer NULL,
	name character varying NULL,
	CONSTRAINT player_pkey PRIMARY KEY (id) 
	)
	