import * as express from 'express';

import permissions from './permissions';

const routes = express.Router();

routes.use('/permissions', permissions);

export default routes;
