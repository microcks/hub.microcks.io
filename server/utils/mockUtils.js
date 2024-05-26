/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

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
  const metadata = apiVersion.metadata ? apiVersion.metadata : {};
  const spec = apiVersion.spec ? apiVersion.spec : {};
  const iconObj = apiVersion.metadata.icon[0];
  const capabilitiesString = spec.capabilities;

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
  */
  return {
    id: generateIdFromVersionedName(metadata.name),
    name: metadata.name,
    displayName: metadata.displayName ? metadata.displayName : metadata.name,
    version: spec.version,
    versionForCompare: normalizeVersion(spec.version),
    replaces: spec.replaces,
    description: metadata.description,
    imgUrl: iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '',
    thumbUrl: thumbBase64 || '',
    capabilityLevel: normalizeCapabilityLevel(capabilitiesString || ''),
    contracts: spec.contracts,
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
  const replacedAPIVersionName = currentAPIVersion.replaces;
  if (!replacedAPIVersionName) {
    return;
  }

  const replacedAPIVersion = apiVersions.find((element) => element.packageName === apiPackage.metadata.name && element.version === replacedAPIVersionName);
  if (replacedAPIVersion) {
    packageAPI.versions.push({ name: replacedAPIVersion.name, version: replacedAPIVersion.version });

    // set APIVersion package info
    currentAPIVersion.packageName = apiPackage.metadata.name;
    // and recurse...
    addReplacedAPIVersions(apiPackage, packageAPI, replacedAPIVersion, apiVersions);
  }
};

const getValidAPIVersions = (apiPackage, apiVersions) => {
  const packageAPIs = apiPackage.spec.apis.map(api => {
    const packageAPI = {
      name: api.name,
      currentVersion: api.currentVersion
    };
    
    const currentAPIVersion = apiVersions.find((element) => element.id === api.name && element.version === api.currentVersion);
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

  return packageAPIs;
} 

const normalizeAPIPackage = async (apiPackage, apiVersions) => {
  const spec = apiPackage.spec ? apiPackage.spec : {};
  const metadata = apiPackage.metadata ? apiPackage.metadata : {};
  const iconObj = apiPackage.metadata.icon[0];
  const categoriesString = metadata.categories;
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
    'provider',
    'source',
    'createdAt',
    'updatedAt',
    'description',
    'imgUrl',
    'thumbUrl',
    'maturity',
    'longDescription',
    'apis'
  */
  return {
    name: metadata.name,
    displayName: metadata.displayName ? metadata.displayName : metadata.name,
    categories: categoriesString && categoriesString.split(',').map((category) => category.trim()),
    provider: metadata.provider.name,
    source: metadata.source,
    createdAt: metadata.createdAt,
    updatedAt: metadata.updatedAt,
    description: metadata.description,
    imgUrl: iconObj ? `data:${iconObj.mediatype};base64,${iconObj.base64data}` : '',
    thumbUrl: thumbBase64 || '',
    maturity: spec.maturity,
    longDescription: spec.description ? spec.description : metadata.description,
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