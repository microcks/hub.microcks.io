type APIVersions = {
	name: string;
	version: string;
};

export type API = {
	name: string;
	currentVersion: string;
	versions: APIVersions[];
};

export type Package = {
	name: string;
	displayName: string;
	categories: string[];
	createDate: string;
	updatedDate: string;
	description: string;
	thumbUrl: string;
	provider: string;
	source: string;
	maturity: string;
	apis: API[];
};

export interface PackageDetails extends Package {
	imgUrl: string;
	longDescription: string;
}

export interface APIDetails extends API {
	maxVersionForCompare: string;
	id: string;
	displayName: string;
	version: string;
	versionForCompare: string;
	replaces: null;
	description: string;
	imgUrl: string;
	thumbUrl: string;
	capabilityLevel: string;
	contracts: {
		type: string;
		url: string;
	};
	link: {
		name: string;
		url: string;
	};
	maintaineres: {
		name: string;
		email: string;
	};
	createdAt: string;
	keywords: string[];
	packageName: Package['name'];
}
