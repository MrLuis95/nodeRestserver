require ('./config/config');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');

const express = require('express');
var schema = buildSchema(readFileSync(__dirname + '/gql/schema.gql', 'utf8'));
var {root} = require('./gql/root');
const app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

module.exports=app
