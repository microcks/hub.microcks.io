import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const namePkg = params.pkj_name ? `/${params.pkj_name}` : '';
	const packageData = await fetch(`http://localhost:4000/api/mocks${namePkg}`).then((res) =>
		res.json()
	);
	const apisData = await fetch(`http://localhost:4000/api/mocks${namePkg}/apis`).then((res) =>
		res.json()
	);

	return {
		packageData,
		apisData
	};
};
