import type { LayoutServerLoad } from './$types';
import type { CoverImage } from '../types';
import { fetchFromApi, API_ROUTES } from '$lib/server/api';

export const config = {
	isr: {
		expiration: 60 * 10 // 10 minutes
	}
};

export const load: LayoutServerLoad = async () => {
	return {
		items: await fetchGalleryImages()
	};
};

const fetchGalleryImages = async (): Promise<CoverImage[]> => {
	const data = await getImageData();
	return data.props.galleryItems.map((item: any) => item.image);
};

const getGalleryThumbnailsFromDatabase = async () => {
	const API_URL = API_ROUTES.galleryThumbnails;
	const data = await fetchFromApi(API_URL);

	return data.data.map((item: any) => {
		const { id, attributes } = item;
		const { title, caption, date, coverImage } = attributes;
		const { url, width, height } = coverImage.data.attributes.formats.small;

		const image: CoverImage = {
			id,
			title,
			caption,
			alt: caption,
			date,
			url,
			width,
			height
		};

		return { image };
	});
};

const getImageData = async () => {
	try {
		const data = await getGalleryThumbnailsFromDatabase();
		return {
			props: {
				galleryItems: data
			}
		};
	} catch (e) {
		throw new Error('Failed to fetch gallery data');
	}
};
