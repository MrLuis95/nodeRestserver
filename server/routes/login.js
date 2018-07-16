const express = require('express');
const {
    loginController
} = require('../include/controllers');
const google = require('../include/google');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    let args = {
        email: body.email
    }
    loginController.getUser(args, body.password)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});


app.post('/login/google', async (req, res) => {
    let token = req.body.id_token;
    let googleUser = await google.verify(token)
        .catch((err) => {
            res.status(403).json({
                ok: false,
                err: {
                    message: "Invalid auth"
                }
            })
        });

    loginController.googleAuth(googleUser)
        .then(obj => res.status(obj.status).send(obj.data))
        .catch(err => res.status(err.status).send(err.data));
});

module.exports = app;