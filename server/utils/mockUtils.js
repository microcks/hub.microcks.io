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
const sharp = require('sharp');

const validCapabilityStrings = ['Incomplete Mocks', 'Full Mocks', 'Mocks + Assertions'];

const normalizeCapabilityLevel = capability => {
  if (validCapabilityStrings.includes(capability)) {
    return capability;
  }
  return validCapabilityStrings[0];
};

const normalizeAPIVersions = apiVersions => 
  Promise.all(
    apiVersions.map(apiVersion => normalizeAPIVersion(apiVersion))
  );

  /**
 * Returns apiVersion name without version as apiVersion Id
 * Cover case when there is no version in name.
 * @param {string} name
 */
const generateIdFromVersionedName = name => {
  let apiVersionId = name;

  // use method only if there is dot
  if (apiVersionId.indexOf('.') > -1) {
    apiVersionId = apiVersionId.slice(0, name.indexOf('.'));
  }
  return apiVersionId;
};

const normalizeVersion = version =>
  version
    .split('.')
    .map(versionField => {
      if (versionField.indexOf('-') === -1) {
        return +versionField + 100000;
      }
      return versionField
        .split('-')
        .map(fieldPart => (_.isNaN(+fieldPart) ? fieldPart : +fieldPart + 100000))
        .join('-');
    })
    .join('.');

const normalizeAPIVersion = async apiVersion => {
  const metadata = _.get(apiVersion, 'metadata', {});
  const spec = _.get(apiVersion, 'spec', {});
  const iconObj = _.get(apiVersion, 'metadata.icon[0]');
  const capabilitiesString = _.get(spec, 'capabilities');

  let thumbBase64;
  if (iconObj) {
    try {
      const imageBuffer = Buffer.from(iconObj.base64data, 'base64');

      const resizedBuffer = await sharp(imageBuffer)
        .resize({
          height: 80,
          fit: 'inside',
          background: 'rgb(255,255,255)'
        })
        .flatten({ background: 'rgb(255,255,255)' })
        .sharpen()
        .toFormat('jpeg')
        .toBuffer();

      const resizedBase64 = resizedBuffer.toString('base64');
      thumbBase64 = `data:image/jpeg;base64,${resizedBase64}`;
    } catch (e) {
      console.warn(`Can't create thumbnail for APIVersion ${apiVersion.metadata.name} using original as fallback`);
      thumbBase64 = iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '';
    }
  }

  /* APIVersion fields
    'id',
    'name',
    'displayName',
    'version',
    'versionForCompare',
    'replaces',
    'provider',
    'description',
    'imgUrl',
    'thumbUrl',
    'capabilityLevel',
    'contract',
    'links',
    'maintainers',
    'createdAt',
    'keywords',
    'packageName'
  */
  return {
    id: generateIdFromVersionedName(metadata.name),
    name: metadata.name,
    displayName: _.get(metadata, 'displayName', metadata.name),
    version: spec.version,
    versionForCompare: normalizeVersion(spec.version),
    replaces: spec.replaces,
    provider: _.get(spec, 'provider.name'),
    description: metadata.description,
    imgUrl: iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '',
    thumbUrl: thumbBase64 || '',
    capabilityLevel: normalizeCapabilityLevel(capabilitiesString || ''),
    contract: spec.contract,
    links: spec.links,
    maintainers: spec.maintainers,
    createdAt: metadata.createdAt,
    keywords: spec.keywords,
    packageName: apiVersion.packageInfo.metadata.name
  };
}

const normalizeAPIPackages = (apiPackages, apiVersions) =>
  Promise.all(
    apiPackages.map(apiPackage => normalizeAPIPackage(apiPackage, apiVersions))
  );

const addReplacedAPIVersions = (apiPackage, packageAPI, currentAPIVersion, apiVersions) => {
  const replacedAPIVersionName = _.get(currentAPIVersion, 'replaces');
  if (!replacedAPIVersionName) {
    return;
  }

  const replacedAPIVersion = _.find(apiVersions, { packageName: apiPackage.metadata.name, version: replacedAPIVersionName });
  if (replacedAPIVersion) {
    packageAPI.versions.push({ name: replacedAPIVersion.name, version: replacedAPIVersion.version });

    // set APIVersion package info
    currentAPIVersion.packageName = apiPackage.metadata.name;
    // and recurse...
    addReplacedAPIVersions(apiPackage, packageAPI, replacedAPIVersion, apiVersions);
  }
};

const getValidAPIVersions = (apiPackage, apiVersions) => {
  const packageAPIs = _.map(apiPackage.spec.apis, api => {
    const packageAPI = {
      name: api.name,
      currentVersion: api.currentVersion
    };

    const currentAPIVersion = _.find(apiVersions, { id: api.name, version: api.currentVersion });
    if (!currentAPIVersion) {
      console.error(
        `ERROR: APIPackage ${apiPackage.metadata.name}, api ${api.name} 
        has a missing or invalid currentVersion value.`
      );
      return null;
    }
    packageAPI.versions = [{ name: currentAPIVersion.name, version: currentAPIVersion.version }];

    // set APIVersion package info
    currentAPIVersion.packageName = apiPackage.metadata.name;
    // analyse replaced version to set package info as well.
    addReplacedAPIVersions(apiPackage, packageAPI, currentAPIVersion, apiVersions);
    return packageAPI;
  });

  return _.compact(packageAPIs);
} 

const normalizeAPIPackage = async (apiPackage, apiVersions) => {
  const spec = _.get(apiPackage, 'spec', {});
  const metadata = _.get(apiPackage, 'metadata', {});
  const iconObj = _.get(apiPackage, 'metadata.icon[0]');
  const categoriesString = _.get(metadata, 'categories');
  const apis = getValidAPIVersions(apiPackage, apiVersions);

  let thumbBase64;
  if (iconObj) {
    try {
      const imageBuffer = Buffer.from(iconObj.base64data, 'base64');

      const resizedBuffer = await sharp(imageBuffer)
        .resize({
          height: 80,
          fit: 'inside',
          background: 'rgb(255,255,255)'
        })
        .flatten({ background: 'rgb(255,255,255)' })
        .sharpen()
        .toFormat('jpeg')
        .toBuffer();

      const resizedBase64 = resizedBuffer.toString('base64');
      thumbBase64 = `data:image/jpeg;base64,${resizedBase64}`;
    } catch (e) {
      console.warn(`Can't create thumbnail for APIVersion ${apiVersion.metadata.name} using original as fallback`);
      thumbBase64 = iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '';
    }
  }

  /* APIPackage fields
    'name', 
    'displayName', 
    'categories',
    'createdAt',
    'updatedAt',
    'description',
    'imgUrl',
    'thumbUrl',
    'provider',
    'maturity',
    'longDescription',
    'apis'
  */
  return {
    name: metadata.name,
    displayName: _.get(metadata, 'displayName', metadata.name),
    categories: categoriesString && _.map(categoriesString.split(','), category => category.trim()),
    createdAt: metadata.createdAt,
    updatedAt: metadata.updatedAt,
    description: metadata.description,
    imgUrl: iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '',
    thumbUrl: thumbBase64 || '',
    provider: _.get(metadata, 'provider.name'),
    maturity: _.get(spec, 'maturity'),
    longDescription: _.get(spec, 'description', metadata.description),
    apis: apis
  };
};

const mockUtils = {
  normalizeAPIVersion,
  normalizeAPIVersions,
  normalizeAPIPackage,
  normalizeAPIPackages
};

module.exports = mockUtils;