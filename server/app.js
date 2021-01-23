const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const db = require('./database/dbHelpers.js');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/homes/:id/photos', (req, res) => {
  var listingId = req.params.id
  db.getPhotos(listingId)
    .then(photos => {
      res.json(photos);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404).end();
    });
});


module.exports = app;