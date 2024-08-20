import type { PageServerLoad } from './$types';

import asyncFetch from '#/asyncFetch';

export const load: PageServerLoad = async () => {
	const data = await asyncFetch('http://localhost:4000/api/mocks');

	return {
		data
	};
};
