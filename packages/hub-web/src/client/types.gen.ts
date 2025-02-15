// This file is auto-generated by @hey-api/openapi-ts

/**
 * Represents a package/bundle of coherent API versions
 */
export type ApiPackage = {
    /**
     * Machine readable name of this API package
     */
    name: string;
    /**
     * Human readblae name of this API package
     */
    displayName: string;
    /**
     * Full description of this package
     */
    description: string;
    /**
     * The classification categories of this package
     */
    categories: Array<Category>;
    /**
     * Date of package creation
     */
    createdAt: string;
    /**
     * Date this package has been updated
     */
    updatedAt: string;
    /**
     * A base64 encoded square image representation
     */
    thumbUrl: string;
    /**
     * The provider of this package
     */
    provider: string;
    /**
     * The API versions bundled within this package
     */
    apis: Array<ApiVersions>;
};

export type Category = 'Banking' | 'Cloud Provider';

/**
 * An APIVersoin if a versioned description of an API and its metadata, contracts, links and maintainers
 */
export type ApiVersion = {
    /**
     * Short machine readable name for this API
     */
    id: string;
    /**
     * The machine readable name of this API version
     */
    name: string;
    /**
     * The human readable name of this API version
     */
    displayName: string;
    /**
     * Version of this API version
     */
    version: string;
    /**
     * Pointer to the previous version name this one replaces
     */
    replaces?: string;
    /**
     * API version provider
     */
    provider: string;
    /**
     * The full description of this API version (usually in Markdown format)
     */
    description: string;
    /**
     * Base64 encoded image of this API version
     */
    imgUrl: string;
    /**
     * Base64 encoded image of this API version package
     */
    thumbUrl: string;
    capabilityLevel: CapabilityLevel;
    /**
     * The contracts or artifacts attached to this API version
     */
    contracts: Array<Contract>;
    /**
     * The useful links related to this API version
     */
    links?: Array<Link>;
    /**
     * The maintainers of this API version
     */
    maintainers: Array<Maintainer>;
    /**
     * Date of creation of this API version
     */
    createdAt: string;
    /**
     * List of keywords for this API version
     */
    keywords: Array<string>;
    /**
     * The name of the package this API version is part-of
     */
    packageName: string;
};

/**
 * An API version maintainer
 */
export type Maintainer = {
    /**
     * Maintainer full name
     */
    name: string;
    /**
     * Email address of maintainer
     */
    email: string;
};

/**
 * A useful link
 */
export type Link = {
    /**
     * Display name for this link
     */
    name: string;
    /**
     * This link URI target
     */
    url: string;
};

/**
 * Summary of an API version
 */
export type ApiVersionSummary = {
    /**
     * Name of this API Version
     */
    name: string;
    /**
     * Version of this API version
     */
    version: string;
};

/**
 * A packaged API and its versions
 */
export type ApiVersions = {
    /**
     * Name of this packaged API
     */
    name: string;
    /**
     * Current version of this packaged API
     */
    currentVersion: string;
    /**
     * Existing versions of this packaged API
     */
    versions: Array<ApiVersionSummary>;
};

/**
 * Express a level of completion and thus capability of an API version artifacts and contracts
 */
export type CapabilityLevel = 'Incomplete Mocks';

/**
 * The maturity level of this package
 */
export type Maturity = 'alpha' | 'beta' | 'stable';

/**
 * Contraxct is an artifact that can be imported into a Microcks instance
 */
export type Contract = {
    url?: string;
    /**
     * This artifact type
     */
    type: 'postman' | 'openapi' | 'asyncapi' | 'grpc' | 'soapui';
};

/**
 * Full informations on an API Package
 */
export type ApiPackageFull = ApiPackage & {
    /**
     * The long human readable description of API Package (usually formated using Markdown)
     */
    longDescription: string;
    /**
     * Base64 encoded image for this API package
     */
    imgUrl: string;
};

export type GetPackagesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/mocks';
};

export type GetPackagesResponses = {
    /**
     * List of found APIPackages
     */
    200: Array<ApiPackage>;
};

export type GetPackagesResponse = GetPackagesResponses[keyof GetPackagesResponses];

export type GetPackageData = {
    body?: never;
    path: {
        /**
         * Name of the package operations are related to
         */
        package: string;
    };
    query?: never;
    url: '/mocks/{package}';
};

export type GetPackageResponses = {
    /**
     * The API package full details
     */
    200: ApiPackageFull;
};

export type GetPackageResponse = GetPackageResponses[keyof GetPackageResponses];

export type GetMocksByPackageApisData = {
    body?: never;
    path: {
        /**
         * Name of the package operations are related to
         */
        package: string;
    };
    query?: never;
    url: '/mocks/{package}/apis';
};

export type GetMocksByPackageApisResponses = {
    /**
     * List of latest API versions making this package
     */
    200: Array<ApiVersion>;
};

export type GetMocksByPackageApisResponse = GetMocksByPackageApisResponses[keyof GetMocksByPackageApisResponses];

export type GetApiVersionData = {
    body?: never;
    path: {
        /**
         * Name of the package operations are related to
         */
        package: string;
        /**
         * Name of the API version operations are related to
         */
        apiVersion: string;
    };
    query?: never;
    url: '/mocks/{package}/apis/{apiVersion}';
};

export type GetApiVersionResponses = {
    /**
     * Get requested API version details
     */
    200: ApiVersion;
};

export type GetApiVersionResponse = GetApiVersionResponses[keyof GetApiVersionResponses];

export type ClientOptions = {
    baseUrl: 'https://hub.microcks.io/api' | (string & {});
};