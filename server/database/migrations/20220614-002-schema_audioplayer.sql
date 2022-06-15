CREATE TABLE IF NOT EXISTS public.audioplayer(
      id_player integer NOT NULL,
      id_audio integer NOT NULL,
        CONSTRAINT audioplayer_pkey PRIMARY KEY (id_player)
);

ALTER TABLE public.audioplayer OWNER TO postgres;