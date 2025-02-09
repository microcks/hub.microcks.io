---
layout: '@layouts/LayoutForMarkdown.astro'
---

# How to describe API package and versions

An API package is made of one or multiple API artifacts that live in their own repository. By API artifacts, we mean any contract standard that is supported by Microcks - and [the list is now extensive](https://microcks.io/documentation/using/importers/#supported-formats) ; you probably already got them at hand!

Check out more details on how to [create API mocks using supported formats](/doc/create-api-mocks).

To ensure the correct registration of your API artifacts are available, you need to give additional information using 2 concepts: the API Package and the API Versions.

## Anatomy of API Package

The `API Package` is the top-level concept that allows you to wrap together a set of related APIs. The package can be related to a product or a standard and it must belongs to a specific business category,

Before diving into the details of the important properties, let’s explore a meaningful example that is the `openbanking.org.uk` API package:

```
apiVersion: mocks.microcks.io/v1alpha1
kind: APIPackage
metadata:
  name: openbanking.org.uk
  displayName: OpenBanking.org.uk APIs
  categories: Banking
  source: Community
  provider:
    name: OpenBanking.org.uk
  createdAt: '2021-04-09T09:01:00.000Z'
  updatedAt: '2021-08-04T12:23:00.000Z'
  description: The OpenBanking.org.uk Standard is designed to assist any European account providers in meeting their PSD2 and RTS requirements.
  icon:
    - base64data: [...]
      mediatype: image/png
spec:
  maturity: alpha
  description: '
    The Open Banking API Specifications consist of 5 distinct types of specifications.
    These include Read/Write API Specifications, Open Data API Specifications, Directory
    Specifications, Dynamic Client Registration Specifications and finally MI Reporting
    Specifications.

    * **Read/Write API Specifications** describe a collection of RESTful APIs that enable
    TPPs to access information and initiate payments for customers, by connecting to ASPSPs
     – securely, efficiently, and with customer consent.

    * **Open Data API Specifications** allow API providers (e.g. banks, building societies 
    and ATM providers) to develop API endpoints which can then be accessed by API users 
    (e.g. third party developers) to build mobile and web applications for banking customers.

    * **Directory Specifications** detail technical information on how the Open Banking 
    Directory works, and the roles and functions of each participant in the Directory.
    
    * **Dynamic Client Registration (DCR) Specifications** define the APIs for TPPs to 
    submit Software Statement Assertions to ASPSPs for the purpose of creating OAuth clients 
    that are registered with ASPSPs.
    
    * **MI Reporting Specifications** for MI Reporting of ASPSPs to Open Banking. MI 
    specification includes detailed Data Dictionary and examples of MI reporting template.
  '
  apis:
    - name: account-and-transaction
      currentVersion: '3.1.0'
    - name: atm-locator
      currentVersion: '2.3.0'
    - name: branch-locator
      currentVersion: '2.3.0'
```

You may want to have a look at [how this package page is rendered](https://hub.microcks.io/package/openbanking.org.uk) on the Hub to understand how this information is used.

First things to notice are the two first lines that are marker constants. We use a specific `kind` and `apiVersion` to clearly identify what this manifest is all about. As of today, the Hub only supports `mocks.microcks.io/v1alpha1` version of `APIPackage`

```yaml
apiVersion: mocks.microcks.io/v1alpha1
kind: APIPackage
```

Then, the manifest contains a general `metadata` block whose properties are really straight-forward. The only tricky thing could be the furniture of the `icon`. For `icon` we need a square-shaped icon with a valid `mediatype` (`image/png` encouraged) and the image data being encoded using base64. There are a lot of “png to base64” online tools existing so it shouldn’t be that hard ;-)

We finally get through `spec` block that allows us to describe package content:

* The `maturity` property gives some insights on your package lifecycle stage: is it complete yet? Is this a work in progress? The possible values are `alpha`, `beta`, `candidate` and `stable`,
* The `description` property allows a long text description that should be supplied using [Markdown](https://en.wikipedia.org/wiki/Markdown) language for richer formatting of information,
* The `apis` property is an array of `APIVersion` pointers. Each item of this array should represent a member of this package with the current default version it should propose to users. Over time, your contributions will certainly bring new versions and the Hub will keep the history and give users the choice of API version.

The `name` and `currentVersion` you use for APIs in your package are really important because they are used to fully identify the corresponding `APIVersion` manifest. So keep them at hand!

## Anatomy of API Version

An `API Version` is simply the versioned API that is a member of an API package. The Hub will keep history of different versions you’ll release through your package. An API Version links to your API artifacts through the `contracts` property.

Before diving into the details of the important properties, let’s explore a meaningful example that is the `account-and-transaction.3.1.0` API from the `openbanking.org.uk` API package:

```
apiVersion: mocks.microcks.io/v1alpha1
kind: APIVersion
metadata:
  name: account-and-transaction.3.1.0
  displayName: Read/Write API - Account and Transaction
  createdAt: '2021-04-09T09:01:00.000Z'
  description: 'The Account and Transaction API Profile describes the flows and
    common functionality for the Accounts and Transaction API, which allows an
    Account Information Service Provider (AISP) to:

    * Register an intent to retrieve account information by creating an "account
      access consent". This registers the data "permissions", expiration and
      historical period allowed for transactions / statements - that the customer
      (PSU) has consented to provide to the AISP; and

    * Subsequently, retrieve account and transaction data.

    This profile should be read in conjunction with a compatible Read/Write Data
    API Profile which provides a description of the elements that are common across
    all the Read/Write Data APIs, and compatible individual resources.
  '
  icon:
    - base64data: [...]
      mediatype: image/png
spec:
  version: 3.1.0
  capabilities: Incomplete Mocks
  contracts:
    - type: postman
      url: https://github.com/microcks/microcks-quickstarters/[...]/v3.1.0.postman_collection.json
  links:
    - name: OpenBanking.org.uk mocks repository
      url: https://github.com/microcks/microcks-quickstarters
  maintainers:
    - email: laurentmicrocks.io
      name: Laurent Broudoux
  keywords:
    - openbanking
    - account
    - transaction
    - psd2
```

You may want to have a look at [how this API version page is rendered](https://hub.microcks.io/package/openbanking.org.uk/api/account-and-transaction.3.1.0) on the Hub to understand how this information is used.

First things to notice are the two first lines that are marker constants. We use a specific `kind` and `apiVersion` to clearly identify what this manifest is all about. As of today, the Hub only supports `mocks.microcks.io/v1alpha1` version of `APIVersion`

```yaml
apiVersion: mocks.microcks.io/v1alpha1
kind: APIVersion
```

Then, the manifest contains a general `metadata` block whose properties are really straight-forward. API Version is identified through its `name` property that should be the concatenation of the `name` and `currentVersion` of the API in the wrapping package.

```yaml
name: <name of API in package>.<currentVersion of API in package>
```

We got the same trick here as in the package about the furniture of an  `icon` for the API: we need a square-shaped icon with a valid `mediatype` (`image/png` encouraged) and the image data being encoded using base64. One noticeable difference here is that the `description` property can be a long text using the [Markdown](https://en.wikipedia.org/wiki/Markdown) format.

We finally get through `spec` block that allows us to describe the API version content:

* The `version` property is a simple reminder of the API version,
* The `capabilities` property is an indicator of the maturity levels of the linked API artifacts (or `contracts`). Depending on their completeness, and the presence of additional testing assertions, you may choose one of those level:

![Mock levels capabilities](/assets/images/mocks-level-3.svg "Mock levels capabilities")

* `Incomplete Mocks` means that there’s at least one operation of the API that does not have mocks available,
* `Full Mocks` means that exactly all the operations of the API have at least on mock available,
* `Mocks + Assertions` means that we have the `Full Mocks` levels and there’s test assertions (typically Postman or SoapUI assertions) that are embedded into the contracts attached to this API. That way, users are able to use artifacts as a Test and Compliance Kit (TCK) for their API implementations.
* The `contracts` property is an array of links to the artifacts describing this API version. If many items are present, the first one is considered as the **primary** artifact and the others as **secondary** ones in Microcks. See [multi-artifacts support](https://microcks.io/documentation/using/importers/#multi-artifacts-support) for more details. A contract item has :
  * a `type` property that helps users understand the nature of this artifact - valid values are `openapi`, `asyncapi`, `grpc`, `postman`, `soapui` at time of writing,
  * a `url` that should be publicly accessible to retrieve this contract. We only require HTTP access but encourage you to consider using a Git repository and pointing to a well-identified revision of the file (using a Git tag or commit ID url).
* The `links` property provides as many links with `name` and `url` as you find it useful. It could link to your organization website, your standard or product page or associated Git repository,
* The `provider` property describes the API provider. It can be different from the package `provider`,
* The `maintainers` property allows you to give credit to hard workers on this API ;-)

Finally, the `keywords` allows you to specify useful keywords for tagging your API in the Hub.

## Verify your manifests

The [Community Mocks Repository](https://github.com/microcks/community-mocks) provides JSON Schemas that define the grammar of API Package and API Version manifests. These schemas can be used to validate your manifests before submitting them. You can check them here: [https://github.com/microcks/community-mocks/tree/master/schemas](https://github.com/microcks/community-mocks/tree/master/schemas)

To validate your manifests using the schemas, you can use the [ajv-cli](https://www.npmjs.com/package/ajv-cli) validator. This is one of the tools we are using to automatically verify your manifests once submitted to the Hub. You can use them from your laptop after having installed the validator and retrieving the schemas from the Git repository with below commands:

```sh
npm install -g ajv-cli ajv-formats
git clone https://github.com/microcks/community-mocks
cd community-mocks/
```

Let say you have a `package.yml` API Package file, you can validate it with below command:

```sh
ajv validate -s schemas/APIPackage-v1alpha1-schema.json -d package.yml -c ajv-formats
```

Let say you have a `version.yml` API Version file, you can validate it with below command:

```sh
ajv validate -s schemas/APIVersion-v1alpha1-schema.json -d version.yml -c ajv-formats
```
