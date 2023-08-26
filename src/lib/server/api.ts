// Define a common function to make API requests
export const fetchFromApi = async (url: string) => {
	const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch data: ${response.statusText}`);
	}

	return response.json();
};
