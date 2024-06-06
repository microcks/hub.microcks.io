export type API = {
	id: number;
	name: string;
	description: string;
	slug: string;
	version: string;
};

export type Package = {
	id: number;
	name: string;
	provider: string;
	description: string;
	logo: string;
	categories: string[];
	slug: string;
	apis: API[];
};
