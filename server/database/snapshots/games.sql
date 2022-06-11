CREATE TABLE public.games(
	id integer NOT NULL DEFAULT nextval('games_id_seq'::regclass),
	name character varying NULL,
	CONSTRAINT games_pkey PRIMARY KEY (id) 
	)
	