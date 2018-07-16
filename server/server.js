'use strict'
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())

app.use(require('./include/routes'));
app.use(require('./graphql'))
mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw err;
    console.log('MongoDB: Connected');
})
app.listen(process.env.PORT, () => console.log("Escuchando puerto: ", process.env.PORT));