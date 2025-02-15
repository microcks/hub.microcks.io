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

import persistentStore from '../../store/persistentStore.js';

const listPackages = function (req, res) {
  console.debug("-- Invoking the listPackages API");
  persistentStore.getPackages((packages, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(packages);
  });
};

const getAPIPackage = function (req, res) {
  console.debug("-- Invoking the getPackage API");
  const apiPackage = req.params.apiPackage;

  persistentStore.getPackage(apiPackage, (apiPackage, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(apiPackage);
  });
};

const listAPIVersions = function (req, res) {
  console.debug("-- Invoking the listAPIVersions API");
  const apiPackage = req.params.apiPackage;

  persistentStore.getLatestAPIVersionsByPackage(apiPackage, (apiVersions, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(apiVersions);
  });
};

const getAPIVersion = function (req, res) {
  console.debug("-- Invoking the getAPIVersion API");
  const apiPackage = req.params.apiPackage;
  const apiVersion = req.params.apiVersion;
  persistentStore.getAPIVersionWithPackage(apiPackage, apiVersion, (apiVersion, err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    return res.status(200).json(apiVersion);
  });
};

export default {
  listAPIVersions,
  listPackages,
  getAPIPackage,
  getAPIVersion,
}