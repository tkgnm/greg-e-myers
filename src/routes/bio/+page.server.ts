import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchFromApi } from '$lib/server/api';

const getBioFromDatabase = async () => {
	const API_URL = API_ROUTES.bio;
	const data = await fetchFromApi(API_URL);

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
