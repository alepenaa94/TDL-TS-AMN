CREATE TABLE public.gameinplay(
	id_player integer NOT NULL,
	id_game integer NOT NULL,
	available_life integer NULL,
	CONSTRAINT gameinplay_pkey PRIMARY KEY (id_player),
	CONSTRAINT gameinplay_pkey PRIMARY KEY (id_player),
	CONSTRAINT gameinplay_pkey PRIMARY KEY (id_game),
	CONSTRAINT gameinplay_pkey PRIMARY KEY (id_game) 
	)
	