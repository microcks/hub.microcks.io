/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
'use strict';

var errors = require('./components/errors');

const getReleaseDate = (request, response) => {
  const releaseInfo = {
    releaseDate: "2021-07-06",
    currentTime: Date.now()
  };
  response.send({ releaseInfo });
};

module.exports = function (app) {
  // Insert routes below
  app.use('/api/mocks', require('./api/mocks'));
  app.use('/api/webhook', require('./api/webhook'));

  app.get('/api/releasedate', getReleaseDate);
  app.get('/healthz', (request, response) => {response.sendStatus(200)});

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.sendStatus(404);
    });
    //.get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function (req, res) {
      res.sendFile(app.get('appPath') + '/index.html');
    });
};