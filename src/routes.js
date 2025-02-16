import express from 'express';
import { getDatabase } from './lib/db.client.js';
import { environment } from './lib/environment.js';
import { logger } from './lib/logger.js';
import xss from 'xss';

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



  //  for each question_id, get answers

  for (const question of questions) {
    const answers = await getDatabase()?.query('SELECT * FROM answers WHERE question_id = $1', [question.id]);
    question.answers = answers?.rows ?? [];
  }

  console.log(questions);


  res.render('category', { title, questions}); // sækja spurningar fyrir þile, gögnin

});

router.get('/form', async (req, res) => {
  const data = await getDatabase()?.query('SELECT * FROM categories');

  const flokkar = data?.rows ?? [];

  console.log(flokkar);


  res.render('form', { title: 'Búa til flokk eða spurningu', flokkar });
});

router.post('/form', async (req, res) => {
  const { name } = req.body;

  const {spurning, flokkur, svar1, svar2, svar3, svar4} = xss(req.body); 
  let correct = xss(req.body.correct); 

  console.log(spurning, flokkur, svar1, svar2, svar3, svar4, correct);

  console.log(name);

  // TODO: bæta við validation áður en sett er í gagnagrunn

  // Ef validation klikkar, senda skilaboð um það á notanda


// rétt svör
  correct = Array.isArray(correct) ? correct.map(Number) : [Number(correct)];


  const answers = [
    { text: svar1, correct: correct.includes(1) },
    { text: svar2, correct: correct.includes(2) },
    { text: svar3, correct: correct.includes(3) },
    { text: svar4, correct: correct.includes(4) },
    ];

//console.log(answers);

  // Ef allt OK, búa til í gagnagrunn.
  const env = environment(process.env, logger);
  if (!env) {
    process.exit(1);
  }

  const db = getDatabase();

  if (name) {
      await db?.query('INSERT INTO categories (name) VALUES ($1)', [name,]);
  }

  let ny_spurning_skila_id;
  if (flokkur && spurning) {
    ny_spurning_skila_id = await db?.query('INSERT INTO questions (category_id, question) VALUES ($1, $2) RETURNING id', [flokkur, spurning]);
  }

  const ans_id = ny_spurning_skila_id?.rows[0].id;

  if (ans_id && answers) {
    for (let i = 0; i < answers.length; i++) {
    await db?.query('INSERT INTO answers (question_id, answer, correct) VALUES ($1, $2, $3)', [ans_id, answers[i].text, answers[i].correct]);
    }
  }
  

  res.render('form-created', { title: 'Flokkur búinn til' });
});
