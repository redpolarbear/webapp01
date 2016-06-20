/*
 * Main Application Routes
 */
'use strict';
var express = require('express');
var router = express.Router();

// app.use('/api/additem', scrape);
router.get('/scrapeitem', function(req, res) {
      res.sendFile('index.html');
});

router.get('/', function(req, res) {
      res.sendFile('index.html');
});

module.exports = router;
/*
var errors = require('./components/errors');

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);
*/
