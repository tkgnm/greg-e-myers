import type { LayoutServerLoad } from './$types';
import type { CoverImage } from '../types';
import { fetchFromApi, API_ROUTES } from '$lib/server/api';

export const prerender = true;

const fetchGalleryImages = async (): Promise<CoverImage[]> => {
	const data = await getImageData();

	const sortedItems = data.props.galleryItems.sort((a: any, b: any) => {
		const dateA = new Date(a.image.date);
		const dateB = new Date(b.image.date);
		return dateA.getTime() + dateB.getTime();
	});

	return sortedItems.map((item: any) => item.image);
};

const getGalleryThumbnailsFromDatabase = async () => {
	const data = await fetchFromApi(API_ROUTES.galleryThumbnails);

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

export const load: LayoutServerLoad = async () => {
	return {
		items: await fetchGalleryImages()
	};
};
