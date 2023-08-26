import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const getBioFromDatabase = async () => {
	const API_URL = 'https://gregemyers-api-fly.fly.dev/api/bio';
	const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

	const response = await fetch(API_URL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch bio data: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data.attributes.text;
};

export const load: PageServerLoad = async () => {
	try {
		const bio = await getBioFromDatabase();

		return {
			props: {
				bio
			}
		};
	} catch (e) {
		throw error(404, 'Not found');
	}
};
