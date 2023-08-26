import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchFromApi, API_ROUTES } from '$lib/server/api';

const getBioFromDatabase = async () => {
	const data = await fetchFromApi(API_ROUTES.bio);
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

export const config = {
	isr: {
		expiration: 30
	}
};
