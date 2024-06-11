import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		data: await fetch('http://localhost:4000/api/mocks')
			.then((res) => res.json())
			.then((data) => data)
	};
};
