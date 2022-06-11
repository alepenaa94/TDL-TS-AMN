CREATE TABLE IF NOT EXISTS public.words(
      id integer NOT NULL,
        name VARCHAR,
        CONSTRAINT words_pkey PRIMARY KEY (id)
);

ALTER TABLE public.words OWNER TO postgres;