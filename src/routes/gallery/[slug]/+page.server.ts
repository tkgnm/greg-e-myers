import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

const getGalleryItemFromDatabase = async (params: string) => {
	const API_URL = `https://gregemyers-api-fly.fly.dev/api/gallery-items/${params}?populate=*`;
	const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

	const response = await fetch(API_URL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch gallery data: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data.attributes;
};
export const load: PageServerLoad = async ({ params }) => {
	try {
		const data = await getGalleryItemFromDatabase(params.slug);

		const { uuid, title, caption } = data;

		return {
			uuid: uuid,
			title: title,
			caption: caption
		};
	} catch (e) {
		throw error(404, 'Not found');
	}
};
