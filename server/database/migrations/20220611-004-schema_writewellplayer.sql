CREATE TABLE IF NOT EXISTS public.writewellplayer(
      id_player integer NOT NULL,
      id_writewell integer NOT NULL,
        CONSTRAINT writewellplayer_pkey PRIMARY KEY (id_player)
);

ALTER TABLE public.writewellplayer OWNER TO postgres;