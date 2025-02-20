import express from 'express';
import { getDatabase } from './lib/db.client.js';
import { environment } from './lib/environment.js';
import { logger } from './lib/logger.js';
import xss from 'xss';

export const router = express.Router();


router.get('/', async (res) => {
  try {
  const result = await getDatabase()?.query('SELECT * FROM categories');

  const categories = result?.rows ?? [];
  res.render('index', { title: 'Forsíða', categories });

} catch (error) {
  res.status(500).render('error', { title: 'Villa', error: error});
}
});

router.get('/spurningar/:category',async (req, res) => {

  try {
  const title = req.params.category; 

  const get_id = await getDatabase()?.query('SELECT id FROM categories WHERE lower(name) = lower($1)', [title]);
  const category_id = get_id?.rows[0].id
  
  const result = await getDatabase()?.query('SELECT * FROM questions WHERE category_id = $1', [category_id]);

  const questions = result?.rows ?? [];

  for (const question of questions) {
    const answers = await getDatabase()?.query('SELECT * FROM answers WHERE question_id = $1', [question.id]);
    question.answers = answers?.rows ?? [];
  }

  res.render('category', { title, questions}); // sækja spurningar fyrir þile, gögnin

} catch (error) {
  res.status(500).render('error', { title: 'Villa', error: error});}

});

router.get('/form', async (res) => {
  try {
  const data = await getDatabase()?.query('SELECT * FROM categories');

  const flokkar = data?.rows ?? [];

  console.log(flokkar);


  res.render('form', { title: 'Búa til flokk eða spurningu', flokkar });

} catch (error) {
  res.status(500).render('error', { title: 'Villa', error: error});
}
});

router.post('/question', async (req, res) => {
  try {

    const spurning = xss(req.body.spurning);
    const flokkur = xss(req.body.flokkur);
    const svar1 = xss(req.body.svar1);
    const svar2 = xss(req.body.svar2);
    const svar3 = xss(req.body.svar3);
    const svar4 = xss(req.body.svar4);

    let correct = xss(req.body.correct); 

    console.log(spurning, flokkur, svar1, svar2, svar3, svar4, correct);

   // TODO: bæta við validation áður en sett er í gagnagrunn

    // Ef validation klikkar, senda skilaboð um það á notanda

    if (correct.length !== 1) {
      res.status(400).send('Þú verður að velja aðeins EITT rétt svar');
      return;
    }

    if (spurning.length < 5 || spurning.length > 1000) {
      res.status(400).send('Spurning verður að vera á milli 5 og 1000 stafir');
      return;
    }

    if (!svar1 || !svar2 || !svar3 || !svar4){
      res.status(400).send('Fylla skal út alla svarmöguleika')   }


    correct = Array.isArray(correct) ? correct.map(Number) : [Number(correct)];

    const answers = [
      { text: svar1, correct: correct.includes(1) },
      { text: svar2, correct: correct.includes(2) },
      { text: svar3, correct: correct.includes(3) },
      { text: svar4, correct: correct.includes(4) },
      ];


    // Ef allt OK, búa til í gagnagrunn.
    const env = environment(process.env, logger);
    if (!env) {
      process.exit(1);
    }

    const db = getDatabase();

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
  
    res.render('form-created', { title: 'Spurning búinn til' });

  } catch (error) {
    res.status(500).render('error', { title: 'Villa', error: error});
  }
});

router.post('/category', async (req, res) => {
  try {
    const { name } = req.body;
    // Ef allt OK, búa til í gagnagrunn.
    const env = environment(process.env, logger);
    if (!env) {
      process.exit(1);
    }

    const db = getDatabase();

    if (name) {
      await db?.query('INSERT INTO categories (name) VALUES ($1)', [name,]);
    }

    res.render('form-created', { title: 'Flokkur búinn til' });



  } catch (error) {
    res.status(500).render('error', { title: 'Villa', error: error});
  }
});


// test function to test the error function
router.get("/cause-error", () => {
  throw new Error("This is a test error!");

});

// 404
router.use((res) => {
  res.status(404).send("Síða fannst ekki (404)");
});

// 500
router.use((err,res) => {
  const error = err.message || err;
  res.status(500).render("error", { title: "Villa", error: error });
});