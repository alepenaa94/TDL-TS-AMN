/* ============================================================================================== */
/* DATABASE SCHEMA - START                                                                        */
/* ============================================================================================== */

/*==============================================================*/
/* TABLE: error_log                                             */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS public.error_log(
	id SERIAL NOT NULL,
	id_et_type INTEGER NOT NULL,
	id_device INTEGER NULL,
	id_user INTEGER NULL,
	code VARCHAR NOT NULL,
	message VARCHAR NOT NULL,
	details VARCHAR NOT NULL,
	CONSTRAINT pk_error_log PRIMARY KEY (id)
)
INHERITS (public.__creation_log, public.__modification_log, public.__deletion_log)
WITH (OIDS=FALSE);

COMMENT ON TABLE public.error_log IS
'Errors logged include system-level and event violations (for example, attempting to test the wrong unit on a given fixture), etc, but excluding sensor test results and outcomes (pass/fail).
The data included when an error occurs depends on when it occurs. For example, a script error when booting the API server will only have the database update script identifier (id_dbu_script). In contrast, a query or application error that occurs during an impact test will have data for all COLUMNs.';

ALTER TABLE public.error_log OWNER TO postgres;

/*==============================================================*/
/* TABLE: error_types                                           */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS public.error_types(
	id SERIAL NOT NULL,
	name VARCHAR NOT NULL,
	label VARCHAR NOT NULL,
	description VARCHAR NOT NULL,
	CONSTRAINT pk_error_types PRIMARY KEY (id),
	CONSTRAINT ak_error_types UNIQUE (name)
)
INHERITS (public.__creation_log, public.__modification_log, public.__deletion_log)
WITH (OIDS=FALSE);

ALTER TABLE public.error_types OWNER TO postgres;

/*==============================================================*/
/* TABLE: games                                                 */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS public.games(
	 id integer NOT NULL,
        name VARCHAR,
        CONSTRAINT games_pkey PRIMARY KEY (id)
);

ALTER TABLE public.games OWNER TO postgres;

/* ============================================================================================== */
/* DATABASE SCHEMA - END                                                                          */
/* ============================================================================================== */
