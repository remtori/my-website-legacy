const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: true
}));

const adminEmail = 'lqv.remtori@gmail.com';
admin.initializeApp(functions.config().firebase);

// Set admin role for me~
let adminUid;
admin.auth().getUserByEmail(adminEmail).then((user) => {
        if (user.emailVerified) {
            adminUid = user.uid;
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        }
    })
    .catch((error) => {
        console.log(error);
    });

app.get('*', (req, res) => {
    res.send({
        status: 'error',
        message: 'Unknown endpoint!'
    });
});

// api for admin to grant other people access
app.post('/api/grantAccess', async (req, res) => {

    const idToken = req.body.idToken;
    const candidateEmail = req.body.candidateEmail;

    if (typeof idToken !== "string" || typeof candidateEmail !== "string") {
        return res.end(JSON.stringify({
            status: 'error',
            message: "Bad request!"
        }))
    }

    try {

        const decodedToken = await admin.auth().verifyIdToken(idToken);

        if (typeof adminUid === 'undefined' || decodedToken.uid !== adminUid) {
            return res.end(JSON.stringify({
                status: 'error',
                message: 'Permission Denied!',
            }));
        }
    } catch (e) {
        return res.end(JSON.stringify({
            status: 'error',
            message: 'Invalid Token!'
        }))
    }

    try {

        const candidate = await admin.auth().getUserByEmail(candidateEmail);

        await admin.auth().setCustomUserClaims(candidate.uid, {
            staff: true
        });

    } catch (e) {
        return res.end(JSON.stringify({
            status: 'error',
            message: 'Invalid Email!'
        }));
    }

    res.end(JSON.stringify({
        status: 'success',
    }))
});

exports.api = functions.https.onRequest(app);