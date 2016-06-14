/*
 * Main Application Routes
 */
'use strict';

app.route('/')
    .get(function(req, res) {
        res.sendFile('index.html');
    });
/*
var errors = require('./components/errors');

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);
*/

};
