CREATE TABLE IF NOT EXISTS public.gameinplay(
     id_player integer NOT NULL,
     id_game integer NOT NULL,
     available_life integer,
     CONSTRAINT gameinplay_pkey PRIMARY KEY (id_player, id_game)
);

ALTER TABLE public.gameinplay OWNER TO postgres;
