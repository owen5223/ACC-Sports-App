const express = require('express');
var path = require('path');
const addRequestId = require('express-request-id')({setHeader: false});
const nocache = require('nocache');

const app = express();
const port = 3000;

// logging middleware
app.use(addRequestId)
morgan = require('morgan')
morgan.token('id', (req) => req.id.split('-')[0])
app.use(morgan(
  "[:date[web] #:id] Started :method :url",
  {immediate: true}))
app.use(morgan("[:date[web] #:id] Completed :status :res[content-length] bytes in :response-time ms"))

// disable caching
// app.use(nocache());

//routing
app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

app.get('/basketball', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/html/basketball.html'));
});

app.get('/football', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/html/football.html'));
});

app.get('/golf', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/html/golf.html'));
});

app.get('/baseball', (req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.sendFile(path.join(__dirname, '../public/html/baseball.html'));
});


//listen
app.listen(port, () => console.log("Welcome to Owen's web server!\nListening on port 3000....."));