const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Connection to mlabs db
mongoose.connect(`mongodb+srv://kuza:test123@cluster0-xefmw.mongodb.net/test?retryWrites=true`)
mongoose.connection.once('open', () => {
    console.log('connected to mlabs')
})

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000')
})