CREATE TABLE public.wordsplayer(
	id_player integer NOT NULL,
	id_word integer NOT NULL,
	retry integer NULL,
	CONSTRAINT wordsplayer_pkey PRIMARY KEY (id_player) 
	)
	