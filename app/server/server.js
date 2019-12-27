const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const heroes = require('../routes/heroes');

const app = express();
app.set('port', process.env.PORT || 1234);

app.use(cors());
app.use(bodyParser.json());

// all hero routes
app.use('/api', heroes);

// Connect to Database
mongoose.connect('mongodb://localhost/crudAppDb', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.Promise = global.Promise;

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database crudAppDb');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
