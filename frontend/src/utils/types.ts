export type APIVersions = {
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
