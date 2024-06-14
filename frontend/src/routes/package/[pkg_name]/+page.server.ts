import type { PageServerLoad } from './$types';

import asyncFetch from '#/asyncFetch';

export const load: PageServerLoad = async ({ params }) => {
	const namePkg = params.pkg_name ? `/${params.pkg_name}` : '';

	const packageData = await asyncFetch(`http://localhost:4000/api/mocks${namePkg}`);
	const apisData = await asyncFetch(`http://localhost:4000/api/mocks${namePkg}/apis`);

	return {
		packageData,
		apisData
	};
};
