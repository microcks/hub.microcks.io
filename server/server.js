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

const express = require('express'),
  path = require('path'),
  cors = require('cors');

const loadService = require('./services/loadService');
const persistentStore = require('./store/persistentStore');

// Retrieve config
const port = process.env.PORT || 4000;

// Setup server
const app = express();
app.use(cors());

// Configure paths for static resources in production mode
var root = path.normalize(__dirname + '/../frontend')
app.use(express.static(path.join(root, 'dist')));
app.set('appPath', path.join(root, 'dist'));

// Then configure other API routes
require('./routes')(app);

// Start server
const server = app.listen(port, '0.0.0.0', function(){
  console.log('Express server listening on port ' + port);
});

const loadedAPIVersions = () => {
  loadService.loadAPIVersions();
};

persistentStore.initialize(loadedAPIVersions)