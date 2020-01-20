'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var admin = require('firebase-admin');
var functions = require('firebase-functions');
var express$1 = require('express');
var cors_ = require('cors');

const UNKNOWN_ENDPOINT = `{
	status: 'error',
	message: 'Unknown endpoint!'
}`;
const BAD_REQUEST = `{
	status: 'error',
	message: "Bad request!"
}`;
const PERMISSION_DENIED = `{
	status: 'error',
	message: 'Permission Denied!',
}`;
const INVALID_EMAIL = `{
	status: 'error',
	message: 'Invalid Email!'
}`;
const INVALID_PATH = `{
	status: 'error',
	message: 'Invalid Path!'
}`;
const SUCCESS = `{
	status: 'success',
}`;

const route = express$1.Router();
let storage = {};
route.get(['/', '/*?'], (req, res) => {
    if (typeof req.params[0] === "string") {
        let t = storage;
        const keys = req.params[0].split('/').filter(s => s.length > 0);
        for (const key of keys) {
            if (!t.hasOwnProperty(key)) {
                res.json(INVALID_PATH);
                return;
            }
            else
                t = t[key];
        }
        res.json(t);
    }
    else
        res.json(storage);
});
route.post(['/', '/*?'], (req, res) => {
    let t = storage;
    if (typeof req.params[0] === "string") {
        const keys = req.params[0].split('/').filter(s => s.length > 0);
        for (let i = 0; i < keys.length - 1; i++) {
            if (!t.hasOwnProperty(keys[i]))
                t[keys[i]] = {};
            t = t[keys[i]];
        }
        t[keys[keys.length - 1]] = req.body;
    }
    else
        storage = req.body;
    res.json(SUCCESS);
});

async function auth(req, res, next) {
    req.isAdmin = false;
    req.isStaff = false;
    if (typeof req.body === "object" &&
        typeof req.body.idToken !== "string") {
        try {
            const claims = await admin.auth().verifyIdToken(req.body.idToken);
            req.isAdmin = claims.admin === true;
            req.isStaff = claims.staff === true;
        }
        catch (e) { }
    }
    next();
}
function genIsKey(key) {
    return function (req, res, next) {
        if (req[key] === true) {
            next();
        }
        else {
            res.json(PERMISSION_DENIED);
            res.end();
        }
    };
}
const isAdmin = [auth, genIsKey('isAdmin')];

const route$1 = express$1.Router();
route$1.post('/', isAdmin, async (req, res) => {
    const candidateEmail = req.body.candidateEmail;
    if (typeof candidateEmail !== "string") {
        res.json(BAD_REQUEST);
        return;
    }
    try {
        const candidate = await admin.auth().getUserByEmail(candidateEmail);
        await admin.auth().setCustomUserClaims(candidate.uid, {
            staff: req.body.staff === true
        });
    }
    catch (e) {
        res.json(INVALID_EMAIL);
        return;
    }
    res.json(SUCCESS);
});

const routes = express$1.Router();
routes.use('/permissions', route$1);
routes.use('/test', route);

// Make calling a namespace possible with rollup
// https://github.com/rollup/rollup/issues/670#issuecomment-284621537
const express = express$1;
const cors = cors_;
const app = express();
app.use(cors({ origin: true }));
// Remove trailing slash
// https://stackoverflow.com/a/15773824
app.use((req, res, next) => {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    }
    else {
        next();
    }
});
app.use('/api', routes);
app.get('*', (req, res) => {
    res.status(404);
    res.send(UNKNOWN_ENDPOINT);
});

const CONFIG = functions.config();
admin.initializeApp(CONFIG.firebase);
const ADMIN_UID = (CONFIG.admin && CONFIG.admin.uid) || "8MxXfpNCYYXXB6za0QVUqM1sKMz2";
// tslint:disable-next-line: no-floating-promises
admin.auth().setCustomUserClaims(ADMIN_UID, {
    admin: true,
    staff: true,
});
const api = functions.https.onRequest(app);

exports.api = api;
