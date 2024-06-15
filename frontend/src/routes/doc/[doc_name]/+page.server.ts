import type { PageServerLoad } from './$types';

import asyncFetch from '#/asyncFetch';

export const load: PageServerLoad = async ({ params }) => {
	const nameDoc = params.doc_name ? `/${params.doc_name}` : '';

	const docData = await asyncFetch(`http://localhost:4000/documentation${nameDoc}`);

	console.log(docData);

	return {
		docData
	};
};
