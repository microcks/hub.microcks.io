import type { PageServerLoad } from './$types';

import asyncFetch from '#/asyncFetch';

export const load: PageServerLoad = async ({ params }) => {
	const namePkg = params.pkg_name ? `/${params.pkg_name}` : '';
	const nameApi = params.api_name ? `/${params.api_name}` : '';

	const packageData = await asyncFetch(`http://localhost:4000/api/mocks${namePkg}`);
	const apiData = await asyncFetch(`http://localhost:4000/api/mocks${namePkg}/apis${nameApi}`);

	return {
		packageData,
		apiData
	};
};
