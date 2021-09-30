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

const _ = require('lodash');
const sqlite3 = require('sqlite3').verbose();

let db;

const VERSIONS_TABLE = 'apiVersions';
const ID_FIELD = 'id TEXT';
const NAME_FIELD = 'name TEXT';
const DISPLAY_NAME_FIELD = 'displayName TEXT';
const VERSION_FIELD = 'version TEXT';
const VERSION_COMPARE_FIELD = 'versionForCompare TEXT';
const REPLACES_FIELD = 'replaces TEXT';
const DESCRIPTION_FIELD = 'description TEXT';
const IMG_FIELD = 'imgUrl TEXT';
const THUMB_FIELD = 'thumbUrl TEXT';
const CAPABILITY_LEVEL_FIELD = 'capabilityLevel BLOB';
const CONTRACTS_FIELD = 'contracts BLOB';
const LINKS_FIELD = 'links BLOB';
const MAINTAINERS_FIELD = 'maintainers BLOB';
const CREATED_FIELD = 'createdAt BLOB';
const KEYWORDS_FIELD = 'keywords BLOB';
const PACKAGE_NAME_FIELD = 'packageName TEXT';

const apiVersionFields = [
  'id',
  'name',
  'displayName',
  'version',
  'versionForCompare',
  'replaces',
  'description',
  'imgUrl',
  'thumbUrl',
  'capabilityLevel',
  'contracts',
  'links',
  'maintainers',
  'createdAt',
  'keywords',
  'packageName'
];

const apiVersionFieldsList = apiVersionFields.join(', ');
const apiVersionFieldsRefs = _.map(apiVersionFields, () => '?').join(', ');

const PACKAGES_TABLE = 'apiPackage';
const PACKAGE_PACKAGE_NAME_FIELD = 'name TEXT';
const PACKAGE_DISPLAY_NAME_FIELD = 'displayName TEXT';
const PACKAGE_CATEGORIES_FIELD = 'categories BLOB';
const PACKAGE_CREATED_FIELD = 'createdAt BLOB';
const PACKAGE_UPDATED_FIELD = 'updatedAt BLOB';
const PACKAGE_DESCRIPTION_FIELD = 'description TEXT';
const PACKAGE_IMG_FIELD = 'imgUrl TEXT';
const PACKAGE_THUMB_FIELD = 'thumbUrl TEXT';
const PACKAGE_PROVIDER_FIELD = 'provider TEXT';
const PACKAGE_SOURCE_FIELD = 'source TEXT';
const PACKAGE_MATURITY_FIELD = 'maturity TEXT';
const PACKAGE_LONG_DESCRIPTION_FIELD = 'longDescription TEXT';
const PACKAGE_APIS_FIELD = 'apis BLOB';

const packageFields = [
  'name', 
  'displayName', 
  'categories',
  'createdAt',
  'updatedAt',
  'description',
  'imgUrl',
  'thumbUrl',
  'provider',
  'source',
  'maturity',
  'longDescription',
  'apis'
];

const packageFieldsList = packageFields.join(', ');
const packageFieldsRefs = _.map(packageFields, () => '?').join(', ');

exports.initialize = callback => {
  db = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, err => {
    if (err) {
      console.error(err.message);
      callback(err);
      return;
    }
    console.log('Connected to the in-memory SQlite database.');
    db.run(
      `CREATE TABLE ${VERSIONS_TABLE} (
        ${ID_FIELD},
        ${NAME_FIELD},
        ${DISPLAY_NAME_FIELD},
        ${VERSION_FIELD},
        ${VERSION_COMPARE_FIELD},
        ${REPLACES_FIELD},
        ${DESCRIPTION_FIELD},
        ${IMG_FIELD},
        ${THUMB_FIELD},
        ${CAPABILITY_LEVEL_FIELD},
        ${CONTRACTS_FIELD},
        ${LINKS_FIELD},
        ${MAINTAINERS_FIELD},
        ${CREATED_FIELD},
        ${KEYWORDS_FIELD},
        ${PACKAGE_NAME_FIELD}
      )`,
      err2 => {
        if (err2) {
          callback(err2);
        }
        db.run(
          `CREATE TABLE ${PACKAGES_TABLE} (
            ${PACKAGE_PACKAGE_NAME_FIELD},
            ${PACKAGE_DISPLAY_NAME_FIELD},
            ${PACKAGE_CATEGORIES_FIELD},
            ${PACKAGE_CREATED_FIELD},
            ${PACKAGE_UPDATED_FIELD},
            ${PACKAGE_DESCRIPTION_FIELD},
            ${PACKAGE_IMG_FIELD},
            ${PACKAGE_THUMB_FIELD},
            ${PACKAGE_PROVIDER_FIELD},
            ${PACKAGE_SOURCE_FIELD},
            ${PACKAGE_MATURITY_FIELD},
            ${PACKAGE_LONG_DESCRIPTION_FIELD},
            ${PACKAGE_APIS_FIELD}
          )`,
          callback
        );
      }
    );
  });
};

exports.close = () => {
  db.close();
};

const normalizeAPIVersionRow = row => {
  row.createdAt = JSON.parse(row.createdAt);
  row.contracts = JSON.parse(row.contracts);
  row.links = JSON.parse(row.links);
  row.maintainers = JSON.parse(row.maintainers);
  row.keywords = JSON.parse(row.keywords);
  return row;
};

/**
 * Find APIVersion by full name (with version)
 * @param {string} apiVersionName
 * @param {Function} callback
 */
exports.getAPIVersionByName = (apiVersionName, callback) => {
  db.all(`SELECT * FROM ${VERSIONS_TABLE} where name = '${apiVersionName}'`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }

    if (!_.size(rows)) {
      callback(null, `APIVersion ${apiVersionName} is not found.`);
      return;
    }
    callback(normalizeAPIVersionRow(rows[0]));
  });
};

/**
 * Find all APIVersions by packageName and apiVersion name
 * @param {string} packageName name of the package where APIVersion belongs
 * @param {string} apiVersionName
 * @param {Function} callback
 */
exports.getAPIVersionWithPackage = (packageName, apiVersionName, callback) => {
  db.all(
    `SELECT * FROM ${VERSIONS_TABLE} WHERE packageName = '${packageName}' AND name = '${apiVersionName}'`,
    (err, rows) => {
      if (err) {
        console.error(err.message);
        callback(null, err.message);
        return;
      }

      if (!_.size(rows)) {
        callback(null, `No APIVersion '${apiVersionName}' in package '${packageName}' found.`);
        return;
      }
      callback(normalizeAPIVersionRow(rows[0]));
    }
  );
};

/**
 * Find all APIVersions by id
 * @param {string} apiVersionId
 * @param {Function} callback
 */
exports.getAPIVersionsById = (apiVersionId, callback) => {
  db.all(`SELECT * FROM ${VERSIONS_TABLE} where id = '${apiVersionId}'`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }
    if (!_.size(rows)) {
      callback(null, `APIVersion ${apiVersionId} is not found.`);
      return;
    }
    callback(rows.map(normalizeAPIVersionRow));
  });
};

/**
 * Find all latest APIVersions by package
 * @param {string} packageName
 * @param {Function} callback
 */
exports.getLatestAPIVersionsByPackage = (packageName, callback) => {
  db.all(`SELECT * FROM (select name, max(versionForCompare) from ${VERSIONS_TABLE} 
      where packageName = '${packageName}' group by id) as x 
        inner join ${VERSIONS_TABLE} as v on v.name = x.name`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }
    if (!_.size(rows)) {
      callback(null, `APIVersions from ${packageName} are not found.`);
      return;
    }
    callback(rows.map(normalizeAPIVersionRow));
  });
};

/**
 * Get all APIVersions
 * @param {Function} callback
 */
exports.getAPIVersions = callback => {
  db.all(`SELECT * FROM ${VERSIONS_TABLE}`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }
    const apiVersions = _.map(rows, row => normalizeAPIVersionRow(row));
    callback(apiVersions);
  });
};

exports.clearAPIVersions = callback => {
  db.run(`DELETE FROM ${VERSIONS_TABLE}`, callback);
};

exports.setAPIVersions = (apiVersions, callback) => {
  const sql = `INSERT OR IGNORE INTO ${VERSIONS_TABLE} (${apiVersionFieldsList}) VALUES (${apiVersionFieldsRefs})`;
  console.log(`=> Loading ${_.size(apiVersions)} APIVersions in database`);
  exports.clearAPIVersions(clearErr => {
    if (clearErr) {
      console.error(clearErr.message);
    }
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      apiVersions.forEach(apiVersion => {
        db.run(sql, [
          apiVersion.id,
          apiVersion.name,
          apiVersion.displayName,
          apiVersion.version,
          apiVersion.versionForCompare,
          apiVersion.replaces,
          apiVersion.description,
          apiVersion.imgUrl,
          apiVersion.thumbUrl,
          apiVersion.capabilityLevel || null,
          JSON.stringify(apiVersion.contracts),
          JSON.stringify(apiVersion.links),
          JSON.stringify(apiVersion.maintainers),
          JSON.stringify(apiVersion.createdAt),
          JSON.stringify(apiVersion.keywords),
          apiVersion.packageName
        ]);
      });
      db.run('END', callback);
    });
  });
};

const normalizePackageRow = row => {
  row.apis = JSON.parse(row.apis);
  row.categories = JSON.parse(row.categories);
  row.createdAt = JSON.parse(row.createdAt);
  row.updatedAt = JSON.parse(row.updatedAt);
  return row;
};

exports.getPackage = (packageName, callback) => {
  db.all(`SELECT * FROM ${PACKAGES_TABLE} where name = '${packageName}'`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }
    if (!_.size(rows)) {
      callback(null, `package ${packageName} is not found.`);
      return;
    }
    const apiPackage = normalizePackageRow(rows[0]);
    callback(apiPackage);
  });
};

exports.getPackages = callback => {
  //db.all(`SELECT * FROM ${PACKAGES_TABLE}`, (err, rows) => {
  db.all(`SELECT name, displayName, categories, createdAt, updatedAt, description, thumbUrl, provider, source, maturity, apis FROM ${PACKAGES_TABLE}`, (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(null, err.message);
      return;
    }
    const apiPackages = _.map(rows, row => normalizePackageRow(row));
    callback(apiPackages);
  });
};

exports.clearPackages = callback => {
  db.run(`DELETE FROM ${PACKAGES_TABLE}`, callback);
};

exports.setPackages = (packages, callback) => {
  const sql = `INSERT OR IGNORE INTO ${PACKAGES_TABLE} (${packageFieldsList}) VALUES (${packageFieldsRefs})`;
  console.log(`=> Loading ${_.size(packages)} APIPackages in database`);
  exports.clearPackages(() =>
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      packages.forEach(apiPackage => {
        db.run(sql, [
          apiPackage.name,
          apiPackage.displayName,
          JSON.stringify(apiPackage.categories),
          JSON.stringify(apiPackage.createdAt),
          JSON.stringify(apiPackage.updatedAt),
          apiPackage.description,
          apiPackage.imgUrl,
          apiPackage.thumbUrl,
          apiPackage.provider,
          apiPackage.source,
          apiPackage.maturity,
          apiPackage.longDescription,
          JSON.stringify(apiPackage.apis)
        ]);
      });
      db.run('END', callback);
    })
  );
};
