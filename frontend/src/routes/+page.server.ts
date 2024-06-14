import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await fetch('http://localhost:4000/api/mocks').then((res) => res.json());

	return {
		data
	};
};
