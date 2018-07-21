'use strict'
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const subdomain = require('express-subdomain');
const Log = require('./include/log');
const app = express();
const log = Log.initLogger(__filename);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json());


if (process.env.NODE_ENV === 'dev') {
    app.use(subdomain('api', require('./include/routes')));
    app.use(subdomain('graphql', require('./routes/graphql')));
} else {
    app.use(require('./include/routes'));
    app.use(require('./routes/graphql'));
}
app.use(express.static(path.resolve(__dirname, '../public')));
mongoose.connect(process.env.MongoDB, {
    useNewUrlParser: true
}, (err, res) => {
    if (err) throw err;
    log.info('MongoDB: Connected');
})
app.listen(process.env.PORT, () => log.info("Escuchando puerto: ", process.env.PORT));