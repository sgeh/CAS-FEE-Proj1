import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import noteRoutes from './routes/note-routes';

const app = express();

// route static html/js/css files
app.use(express.static(path.resolve('./static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/notes", noteRoutes);

export default app;