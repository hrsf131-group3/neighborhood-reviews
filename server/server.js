require('newrelic');
const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const controllerPsql = require('./controllersPsql.js');
const controller = require('./controllers.js');

const port = 8010;

const db = require('../db/connection.js');

const publicDir = path.join(__dirname, '../client/public');

app.use(bodyParser.json());
app.use('/listings/:id', express.static(publicDir));

// new routes
app.get('*/:id/neighborhoods', controllerPsql.getNeighborhoods);
app.get('*/:id/neighborhoods/reviews', controllerPsql.getReviews);
app.post('*/:id/neighborhoods', controllerPsql.addNeighborhood);

// existing routes
app.get('*/:id/neighborhood_stats', controller.getAllStats);
app.get('*/:id/neighborhood_reviews', controller.getAllReviews);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
