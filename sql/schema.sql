CREATE TABLE IF NOT EXISTS public.categories (
  id serial primary key,
  name varchar(64) not null unique,
  created timestamp with time zone not null default current_timestamp
);


/*Setja kannski nánari skilyrði á lengir spurninga og svara*/
CREATE TABLE IF NOT EXISTS public.questions (
  id serial primary key,
  category_id integer not null references public.categories(id), /*Tengist við rétt category*/
  question text not null, 
  created timestamp with time zone not null default current_timestamp
);


CREATE TABLE IF NOT EXISTS public.answers (
  id serial primary key,
  question_id integer not null references public.questions(id), /*Tengis við rétta spurningu*/
  answer text not null,
  correct boolean not null,
  created timestamp with time zone not null default current_timestamp
);
