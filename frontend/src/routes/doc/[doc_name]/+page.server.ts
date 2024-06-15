import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const nameDoc = params.doc_name ? `/${params.doc_name}.md` : '';
	const response = await fetch(`http://localhost:4000/documentation${nameDoc}`);
	const docData = await response.text();

	return {
		docData
	};
};
