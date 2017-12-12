import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import noteRoutes from './routes/note-routes';
import staticRoutes from './routes/static-routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use("/notes", noteRoutes);
app.use(staticRoutes);

export default app;