import * as express_ from 'express';
import * as cors_ from 'cors';
import { UNKNOWN_ENDPOINT } from './responses';
import routes from './routes';

// Make calling a namespace possible with rollup
// https://github.com/rollup/rollup/issues/670#issuecomment-284621537
const express = express_;
const cors = cors_;

const app = express();

app.use(cors({ origin: true }));

// Remove trailing slash
// https://stackoverflow.com/a/15773824
app.use((req, res, next) => {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
});

app.use('/api', routes);

app.get('*', (req, res) => {
    res.status(404);
    res.send(UNKNOWN_ENDPOINT);
});

export default app;
