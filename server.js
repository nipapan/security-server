const express = require('express');
const morgan = require('morgan');
var winston = require('winston');
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));
// Middleware - CORS
const whiteList = ['http://localhost:8000', 'https://nipapan.github.io'];
const corsOptions = {
   origin: function (origin, callback) {
      if(whiteList.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   }
}
app.use(cors(corsOptions));

//Routes
app.get('/', (req, res) => {
   res.set({
      'Content-Security-Policy': "script-src 'self' 'https://apis.google.com'"
   });
   res.send('Hello World');
});
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