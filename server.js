const express = require('express');
const morgan = require('morgan');
var winston = require('winston');
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));

//Routes
app.get('/', (req, res) => res.send('Hello World'));
app.post('/secret', (req, res) => {
   const {userMsg} = req.body;
   if (userMsg) {
      winston.log('info', 'user message:' + userMsg);
      res.status(200).json('success');
   } else {
      winston.error('Someone is messing with us:' + userMsg);
      res.status(400).json('bad message');
   }
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));