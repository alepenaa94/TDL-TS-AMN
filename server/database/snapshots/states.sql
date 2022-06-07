CREATE TABLE public.states(
	id_country integer NOT NULL,
	created_date timestamp without time zone NOT NULL DEFAULT timezone('UTC'::text, now()),
	modified_by integer NULL,
	modified_date timestamp without time zone NULL,
	deleted boolean NOT NULL DEFAULT false,
	deleted_by integer NULL,
	deleted_date timestamp without time zone NULL,
	id integer NOT NULL DEFAULT nextval('states_id_seq'::regclass),
	created_by integer NOT NULL DEFAULT __current_user(),
	label character varying NULL,
	description character varying NULL,
	name character varying NOT NULL,
	CONSTRAINT pk_states PRIMARY KEY (id),
	CONSTRAINT ak_states UNIQUE (name),
	CONSTRAINT fk_states_country FOREIGN KEY (id_country) REFERENCES public.countries (id) 
	)
	