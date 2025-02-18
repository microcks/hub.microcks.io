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

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const persistentStore = require('../store/persistentStore');
const {
  normalizeAPIVersions,
  normalizeAPIPackages,
} = require('../utils/mockUtils');

const mocksDirectory = './data/community-mocks/artifacts';

/**
 * Derive file type from its content
 * @param {*} content
 * @returns {'API'|'PKG'|'Unknown'}
 */
const getFileType = (content) => {
  if (content.kind && content.apiVersion) {
    const apiName = content.apiVersion.substring(
      0,
      content.apiVersion.indexOf('/')
    );

    if (apiName === 'mocks.microcks.io') {
      if (content.kind === 'APIVersion') {
        return 'API';
      } else if (content.kind === 'APIPackage') {
        return 'PKG';
      }
    }
    // package file is different with no kind and API
  }
  return 'Unknown';
};

/**
 * Read out APIVersion file in nested version folder
 * @param {string} versionDirPath
 * @param {string} fileName
 */
const extractAPIVersionData = (versionDirPath, fileName) => {
  const filePath = path.join(versionDirPath, fileName);

  let apiVersionFile = null;
  let content = null;
  let fileType = 'Unknown';

  try {
    //content = yaml.safeLoad(fs.readFileSync(filePath));
    content = yaml.load(fs.readFileSync(filePath));
    fileType = getFileType(content);
  } catch (e) {
    console.error(`ERROR: Unable to parse ${fileName} as an APIVersion`);
    console.error(e.message);
    return null;
  }

  if (fileType === 'API') {
    apiVersionFile = content;
  } else if (fileType === 'Unknown') {
    console.warn(
      `Cannot identify file ${fileName} in folder ${versionDirPath}. Ignoring file`
    );
  }

  return apiVersionFile;
};

/**
 * Extracts package and APIVersions data from mock
 * @param {string} packageDirPath
 * @param {string} packageDirFileName
 */
const extractMockData = (packageDirPath, packageDirFileName) => {
  // packageDirPath: data/community-mocks/artifacts/openbanking.org.uk
  // packageDirPath: account-and-transaction
  console.log(`  Reading API dir or file ${packageDirFileName}`);
  const mockName = (packageDirPath.match(/[a-z-]+$/i) || ['unknown'])[0];
  const apiDirPath = path.join(packageDirPath, packageDirFileName);
  const apiVersionsFiles = [];

  let packageFile = null;
  let content = null;
  let fileType = 'Unknown';

  // packageDirPath contains one folder per API
  // every API folder container one folder per API version
  // every API version folder has exactly one API file
  if (fs.statSync(apiDirPath).isDirectory()) {
    const apiFolder = apiDirPath; // data/community-mocks/artifacts/openbanking.org.uk/account-and-transaction
    const apiFileNames = fs.readdirSync(apiFolder);

    apiFileNames.forEach((apiFile) => {
      const apiPath = path.join(apiDirPath, apiFile);

      if (fs.statSync(apiPath).isDirectory()) {
        console.log(`    Reading APIVersion dir ${apiFile}`); // 3.1.0
        const apiVersionFileNames = fs.readdirSync(apiPath);

        apiVersionFileNames.forEach((apiVersionFileName) => {
          console.log(`      Reading APIVersion file ${apiVersionFileName}`); // account-and-transaction.3.1.0.api.yml
          const apiVersion = extractAPIVersionData(apiPath, apiVersionFileName);

          // Store result and ignore other files.
          apiVersion && apiVersionsFiles.push(apiVersion);
        });

        if (apiVersionsFiles.length == 0) {
          console.warn(
            `API dir ${apiDirPath} contains no APIVersion! Ignoring it.`,
            apiVersionsFiles
          );
        }

        return {
          packageFile: null,
          apiVersionsFiles,
        };
      }
    });
  } else {
    // packageDirFileName is not a directory but a file.
    try {
      console.log(`    Reading APIPackage file ${apiDirPath}`); // openbanking.org.uk.package.yml
      //content = yaml.safeLoad(fs.readFileSync(apiDirPath));
      content = yaml.load(fs.readFileSync(apiDirPath));
      fileType = getFileType(content);
    } catch (e) {
      console.error(
        `ERROR: Unable to parse ${packageDirFileName} as an APIPackage`
      );
      console.error(e.message);
      return {
        packageFile: null,
        apiVersionsFiles,
      };
    }

    if (fileType === 'PKG') {
      packageFile = content;
    } else if (fileType === 'API') {
      apiVersionFiles.push(content);
    } else if (fileType === 'Unknown') {
      console.warn(
        `Cannot identify file ${packageDirFileName} at folder ${packageDirPath}. Ignoring file`
      );
    }
  }

  return {
    packageFile,
    apiVersionsFiles,
  };
};

/**
 * Loads all APIVersions with packages and normalize them
 * @param {*} callback
 */
const loadAPIVersions = (callback) => {
  const packages = [];
  const apiVersions = [];
  if (fs.existsSync(mocksDirectory)) {
    const mocksDirNames = fs.readdirSync(mocksDirectory);

    mocksDirNames.forEach((packageDirName) => {
      const packageDirPath = path.join(mocksDirectory, packageDirName);
      // packageDirPath: data/community-mocks/artifats/openbanking.org.uk

      if (fs.statSync(packageDirPath).isDirectory()) {
        console.log(`Reading APIPackage dir ${packageDirName}`);
        const packageDirFileNames = fs.readdirSync(packageDirPath);

        let mockPackage = null;
        let mockAPIVersions = [];

        packageDirFileNames.forEach((packageDirFileName) => {
          const { packageFile, apiVersionsFiles } = extractMockData(
            packageDirPath,
            packageDirFileName
          );

          if (mockPackage && packageFile) {
            console.error(
              `APIPackage ${packageDirName} contains multiple package files!. Skipping it.`,
              mockPackage,
              packageFile
            );
          } else if (packageFile) {
            mockPackage = packageFile;
          }
          mockAPIVersions = mockAPIVersions.concat(apiVersionsFiles);
        });

        if (mockPackage) {
          // add package data to apiVersion
          mockAPIVersions.forEach((apiVersion) => {
            apiVersion.packageInfo = mockPackage;

            // add to apiVersion list
            apiVersions.push(apiVersion);
          });

          if (mockAPIVersions.length > 0) {
            packages.push(mockPackage);
          } else {
            console.warn(
              `No valid APIVersion found for mock ${packageDirName}. Skipping this package.`
            );
          }
        } else {
          console.warn(
            `No mock package file found in mock ${packageDirName}. Ignoring it.`
          );
        }
      }
    });

    normalizeAPIVersions(apiVersions).then((normalizedAPIVersions) => {
      //const normalizedPackages = normalizeAPIPackages(packages, normalizedAPIVersions);
      normalizeAPIPackages(packages, normalizedAPIVersions).then(
        (normalizedPackages) => {
          persistentStore.setPackages(normalizedPackages, (packagesErr) => {
            if (packagesErr) {
              console.error(
                'Error when setting packages in persistentStore: ' +
                  packagesErr.message
              );
            }
            persistentStore.setAPIVersions(normalizedAPIVersions, callback);
          });
        }
      );
    });
  }
  return;
};

const loadService = {
  loadAPIVersions,
};
module.exports = loadService;
