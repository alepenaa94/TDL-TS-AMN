CREATE TABLE IF NOT EXISTS public.player(
      id SERIAL NOT NULL,
        name VARCHAR,
        score integer,
        CONSTRAINT player_pkey PRIMARY KEY (id)
);

ALTER TABLE public.player OWNER TO postgres;