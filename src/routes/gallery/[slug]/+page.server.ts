import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';
import type { ArtworkImage, GalleryItem } from '../../../types';
import { fetchFromApi, API_ROUTES } from '$lib/server/api';

export const config = {
	isr: {
		expiration: 60
	}
};

export const entries: EntryGenerator = async () => {
	try {
		const data = await fetchFromApi(API_ROUTES.galleryItems);

		const slugEntries = data.data.map((item: any) => ({ slug: `${item.id}` }));
		return slugEntries;
	} catch (error) {
		throw new Error('Failed to fetch gallery item ID entries');
	}
};

const getGalleryItemFromDatabase = async (id: string): Promise<GalleryItem> => {
	const API_URL = API_ROUTES.galleryItem(id);
	const data = await fetchFromApi(API_URL);

	const { title, caption, description, date, artworks } = data.data.attributes;
	const artworkIDs = artworks.data.map((artwork: any) => artwork.id);

	return { title, caption, description, date, artworkIDs };
};

const getArtworkImageById = async (artworkID: number): Promise<ArtworkImage> => {
	const API_URL = API_ROUTES.artworkImage(artworkID);
	const data = await fetchFromApi(API_URL);

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
