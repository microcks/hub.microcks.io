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

import { handler as ssrHandler } from '../hub-web/dist/server/entry.mjs';
import express from 'express';
import cors from 'cors';

import loadService from './services/loadService';
import persistentStore from './store/persistentStore';
import initRotutes from './routes';

// Retrieve config
const port = process.env.PORT || 4000;
const webhookSecret = process.env.WEBHOOK_SECRET || 'secret101';

// Setup server with config
const app = express();
app.set('webhookSecret', webhookSecret);
app.use(cors());

const base = '/';
app.use(base, express.static('../hub-web/dist/client/'));
app.use(ssrHandler);

// Then configure other API routes
initRotutes(app);

// Start server
const server = app.listen(port, '0.0.0.0', function(){
  console.log('Express server listening on port ' + port);
});

const loadedAPIVersions = () => {
  loadService.loadAPIVersions();
};

persistentStore.initialize(loadedAPIVersions)