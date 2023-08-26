import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';
import type { ArtworkImage, GalleryItem } from '../../../types';

const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export const entries: EntryGenerator = async () => {
	const API_URL = 'https://gregemyers-api-fly.fly.dev/api/gallery-items';

	const response = await fetch(API_URL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch gallery item ID entries');
	}
	const data = await response.json();

	const slugEntries = data.data.map((item: any) => ({ slug: `${item.id}` }));
	return slugEntries;
};

const getGalleryItemFromDatabase = async (id: string): Promise<GalleryItem> => {
	const API_URL = `https://gregemyers-api-fly.fly.dev/api/gallery-items/${id}?populate=*`;

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
	const { title, caption, description, date, artworks } = data.data.attributes;
	const artworkIDs = artworks.data.map((artwork: any) => artwork.id);
	return { title, caption, description, date, artworkIDs };
};

const getArtworkImageById = async (artworkID: number): Promise<ArtworkImage> => {
	const API_URL = `https://gregemyers-api-fly.fly.dev/api/artworks/${artworkID}?populate=*`;

	const response = await fetch(API_URL, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${BEARER_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch artwork image data: ${response.statusText}`);
	}

	const data = await response.json();
	const { attributes } = data.data;
	const { title, technicalDetail, hideCaption, date, image } = attributes;
	const { alternativeText, caption, formats } = image.data.attributes;
	const { url, width, height } = formats.large;
	const artworkImage: ArtworkImage = {
		title,
		technicalDetail,
		caption,
		hideCaption,
		alternativeText,
		date,
		url,
		width,
		height
	};
	return artworkImage;
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const galleryItem = await getGalleryItemFromDatabase(params.slug);
		const { artworkIDs } = galleryItem;
		const artworkImages: Array<ArtworkImage> = await Promise.all(
			artworkIDs.map((artworkID) => getArtworkImageById(artworkID))
		);

		return {
			title: galleryItem.title,
			caption: galleryItem.caption,
			description: galleryItem.description,
			date: galleryItem.date,
			artworkImages: artworkImages
		};
	} catch (e) {
		throw error(404, 'Not found');
	}
};
