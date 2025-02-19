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

import { loadAPIVersions } from './loadService.js';

import { exec } from 'child_process';

const updateLocalMocks = (response, callback) => {
  exec('./scripts/update-mocks.sh', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.error(err.message);
      callback(null, err.message);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    response.send(stdout);

    loadAPIVersions(loadError => {
      if (loadError) {
        console.dir(loadError);
        callback(null, err.message);
      } else {
        console.log('Mocks have been updated');
        callback(true);
      }
    });
  });
};

const updateService = {
  updateLocalMocks
};

export default updateService;