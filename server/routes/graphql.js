require ('../config/config');
const buildSchema = require('graphql').buildSchema;
const readFileSync = require('fs').readFileSync;
const path = require('path');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');

const express = require('express');
var schema = buildSchema(readFileSync(path.resolve(__dirname, '../gql/schema.gql'), 'utf8'));
var {root} = require('../gql/root');
const app = express();

app.use('/', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

module.exports=app
