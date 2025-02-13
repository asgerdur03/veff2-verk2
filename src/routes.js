import express from 'express';
import { getDatabase } from './lib/db.client.js';
import { environment } from './lib/environment.js';
import { logger } from './lib/logger.js';
import { categoriesFromDatabase, questionsFromDatabase } from './lib/db.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  // Frekar reddý?
  const result = await getDatabase()?.query('SELECT * FROM categories');

  //const result = await categoriesFromDatabase();
  const categories = result?.rows ?? [];

 // console.log(categories);
  res.render('index', { title: 'Forsíða', categories });
});

router.get('/spurningar/:category',async (req, res) => {
  // TEMP EKKI READY FYRIR PRODUCTION
  const title = req.params.category; // titill er sá sami og 

  // finna category id til að sækja spurningar
  const get_id = await getDatabase()?.query('SELECT id FROM categories WHERE lower(name) = lower($1)', [title]);
  const category_id = get_id?.rows[0].id

  console.log(category_id);
  
  // sækja spurningar
  const result = await getDatabase()?.query('SELECT * FROM questions WHERE category_id = $1', [category_id]);

  const questions = result?.rows ?? [];

  // console.log(questions);


  //  for each question_id, get answers


  res.render('category', { title, questions, answers}); // sækja spurningar fyrir þile, gögnin

});

router.get('/form', (req, res) => {
  res.render('form', { title: 'Búa til flokk' });
});

router.post('/form', async (req, res) => {
  const { name } = req.body;

  console.log(name);

  // Hér þarf að setja upp validation, hvað ef name er tómt? hvað ef það er allt handritið að BEE MOVIE?
  // Hvað ef það er SQL INJECTION? HVAÐ EF ÞAÐ ER EITTHVAÐ ANNAÐ HRÆÐILEGT?!?!?!?!?!
  // TODO VALIDATION OG HUGA AÐ ÖRYGGI

  // Ef validation klikkar, senda skilaboð um það á notanda

  // Ef allt OK, búa til í gagnagrunn.
  const env = environment(process.env, logger);
  if (!env) {
    process.exit(1);
  }

  const db = getDatabase();

  const result = await db?.query('INSERT INTO categories (name) VALUES ($1)', [name,]);


  console.log(result);

  res.render('form-created', { title: 'Flokkur búinn til' });
});
