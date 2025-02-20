import express from 'express';
import { router } from './routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));


import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix the views directory path
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);

/*  var ekki að virka á windows
const viewsPath = new URL('./views', import.meta.url).pathname;
app.set('views', viewsPath);
*/


app.set('view engine', 'ejs');


// Serve static files (CSS, JS, images)
const publicPath = path.join(__dirname, '../public'); // Ensure correct path
app.use(express.static(publicPath));

app.use('/', router);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
