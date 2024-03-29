export const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export const fetchFromApi = async (url: string) => {
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

const API_BASE_URL = 'https://gregemyers-api-fly.fly.dev/api';

export const API_ROUTES = {
	galleryItem: (id: string) => `${API_BASE_URL}/gallery-items/${id}?populate=*`,
	artworkImage: (artworkID: number) => `${API_BASE_URL}/artworks/${artworkID}?populate=*`,
	galleryItems: `${API_BASE_URL}/gallery-items`,
	bio: `${API_BASE_URL}/bio`,
	galleryThumbnails: `${API_BASE_URL}/gallery-items?populate=*`
};

export const CLOUDFRONT_BASE_URL = 'https://d2tzn7fryno3g4.cloudfront.net';

export const convertToCloudfrontUrl = (url: string) => {
	const pathname = new URL(url).pathname;
	return `${CLOUDFRONT_BASE_URL}${pathname}`;
};
