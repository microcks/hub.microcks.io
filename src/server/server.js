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

import express from 'express';
import cors from 'cors';

import { loadAPIVersions } from './services/loadService.js';
import persistentStore from './store/persistentStore.js';
import initRotutes from './routes.js';

// Retrieve config
const port = process.env.PORT || 4000;
const webhookSecret = process.env.WEBHOOK_SECRET || 'secret101';

// Setup server with config
const app = express();
app.set('webhookSecret', webhookSecret);
app.use(cors());

const base = '/';
app.use(base, express.static('../hub-web/dist/client/'));
if (process.env.API_ONLY === false) {
  import('../hub-web/dist/server/entry.mjs').then(({ handler: ssrHandler }) => {
    app.use(ssrHandler);
    startServer();
  });
} else {
  startServer();
}

// Then configure other API routes
initRotutes(app);

function startServer() {
  // Start server
  const server = app.listen(port, '0.0.0.0', function () {
    console.log('Express server listening on port ' + port);
  });

  const loadedAPIVersions = () => {
    loadAPIVersions();
  };

  persistentStore.initialize(loadedAPIVersions);
}
