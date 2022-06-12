CREATE TABLE IF NOT EXISTS public.writewell(
      id integer NOT NULL,
        name VARCHAR,
        result BOOLEAN,
        CONSTRAINT writewell_pkey PRIMARY KEY (id)
);

ALTER TABLE public.writewell OWNER TO postgres;