CREATE TABLE public.roles(
	active boolean NOT NULL DEFAULT true,
	created_date timestamp without time zone NOT NULL DEFAULT timezone('UTC'::text, now()),
	modified_by integer NULL,
	modified_date timestamp without time zone NULL,
	deleted boolean NOT NULL DEFAULT false,
	deleted_by integer NULL,
	deleted_date timestamp without time zone NULL,
	id integer NOT NULL DEFAULT nextval('roles_id_seq'::regclass),
	rank integer NOT NULL,
	created_by integer NOT NULL DEFAULT __current_user(),
	description character varying NOT NULL,
	name character varying NOT NULL,
	label character varying NOT NULL,
	CONSTRAINT pk_roles PRIMARY KEY (id),
	CONSTRAINT ak_roles UNIQUE (name) 
	)
	