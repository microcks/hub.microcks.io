const asyncFetch = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		console.error(`Error fetching data from ${url}: ${res.status} ${res.statusText}`);
		return null;
	}

	try {
		return await res.json();
	} catch (err) {
		console.error(`Error parsing JSON from ${url}:`, err);
		return null;
	}
};

export default asyncFetch;
