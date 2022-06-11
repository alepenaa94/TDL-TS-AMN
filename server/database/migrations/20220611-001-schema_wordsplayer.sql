CREATE TABLE IF NOT EXISTS public.wordsplayer(
      id_player integer NOT NULL,
      id_word integer NOT NULL,
        retry integer,
        CONSTRAINT wordsplayer_pkey PRIMARY KEY (id_player)
);

ALTER TABLE public.wordsplayer OWNER TO postgres;