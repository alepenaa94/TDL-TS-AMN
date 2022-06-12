CREATE TABLE IF NOT EXISTS public.mathplayer(
      id_player integer NOT NULL,
      id_math integer NOT NULL,
        CONSTRAINT mathplayer_pkey PRIMARY KEY (id_player)
);

ALTER TABLE public.mathplayer OWNER TO postgres;