// ---------------------------------------------------
// Import NPM Libs
// ---------------------------------------------------

const helmet = require('helmet');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

const app = express();
const httpServer = http.Server(app);
const port = 3000;

app.enable('trust proxy');

// app.use(helmet());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// ---------------------------------------------------
// Define template engine
// ---------------------------------------------------

app.use(express.static(__dirname + '/../public'));
app.set('views', __dirname + '/../public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(
  compression({
    filter: function() {
      return true;
    }
  })
);

// ---------------------------------------------------
// Import Helpers
// ---------------------------------------------------

const appRoutes = require('./routes/app');
app.use('/', appRoutes);

// ---------------------------------------------------
// Start Server
// ---------------------------------------------------

let server = httpServer.listen(process.env.PORT || port, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Started server at http://%s:%s', host, port);
});
