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

const persistentStore = require('../../store/persistentStore');

exports.listPackages = function (req, res) {
  console.debug('-- Invoking the listPackages API');
  persistentStore.getPackages((packages, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(packages);
  });
};

exports.getAPIPackage = function (req, res) {
  console.debug('-- Invoking the getPackage API');
  const apiPackage = req.params.apiPackage;

  persistentStore.getPackage(apiPackage, (apiPackage, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(apiPackage);
  });
};

exports.listAPIVersions = function (req, res) {
  console.debug('-- Invoking the listAPIVersions API');
  const apiPackage = req.params.apiPackage;

  persistentStore.getLatestAPIVersionsByPackage(
    apiPackage,
    (apiVersions, err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      return res.status(200).json(apiVersions);
    }
  );
};

exports.getAPIVersion = function (req, res) {
  console.debug('-- Invoking the getAPIVersion API');
  const apiPackage = req.params.apiPackage;
  const apiVersion = req.params.apiVersion;
  persistentStore.getAPIVersionWithPackage(
    apiPackage,
    apiVersion,
    (apiVersion, err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      return res.status(200).json(apiVersion);
    }
  );
};
