/*==============================================================*/
/* TABLE: games                                                 */
/*==============================================================*/
CREATE TABLE IF NOT EXISTS public.games(
      id SERIAL NOT NULL,
        name VARCHAR,
        CONSTRAINT games_pkey PRIMARY KEY (id)
);

ALTER TABLE public.games OWNER TO postgres;