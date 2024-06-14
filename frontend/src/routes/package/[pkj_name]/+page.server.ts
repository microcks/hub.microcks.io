import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const namePkg = params.pkj_name ? `/${params.pkj_name}` : '';
	const data = await fetch(`http://localhost:4000/api/mocks${namePkg}`).then((res) => res.json());

	return {
		data
	};
};
