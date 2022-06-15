CREATE TABLE IF NOT EXISTS public.audio(
      id integer NOT NULL,
        name VARCHAR,
        CONSTRAINT audio_pkey PRIMARY KEY (id)
);

ALTER TABLE public.audio OWNER TO postgres;