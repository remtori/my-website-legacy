import * as express from 'express';

import test from './routes/test';
import permissions from './routes/permissions';

const routes = express.Router();

routes.use('/permissions', permissions);
routes.use('/test', test);

export default routes;
