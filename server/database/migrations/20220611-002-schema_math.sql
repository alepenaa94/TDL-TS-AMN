CREATE TABLE IF NOT EXISTS public.math(
      id integer NOT NULL,
      operando1 integer NOT NULL,
      operando2 integer NOT NULL,
      operador VARCHAR,
      resultado integer NOT NULL,
        CONSTRAINT math_pkey PRIMARY KEY (id)
);

ALTER TABLE public.math OWNER TO postgres;