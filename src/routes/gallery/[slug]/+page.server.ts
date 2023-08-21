import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { EntryGenerator } from './$types';

interface ArtworkImage {
	id: string;
	attributes: ImageData;
}

interface ImageData {
	title: string;
	technicalDetail: string;
	hideCaption: boolean;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	date: string;
}

const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export const prerender = true;

export const entries: EntryGenerator = () => {
	return [
		{ slug: '1' },
		{ slug: '2' },
		{ slug: '4' },
		{ slug: '5' },
		{ slug: '6' },
		{ slug: '7' },
		{ slug: '8' }
	];
};

const getGalleryItemFromDatabase = async (id: string) => {
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
	return data.data.attributes;
};

const getArtworkImageById = async (id: string) => {
	const API_URL = `https://gregemyers-api-fly.fly.dev/api/artworks/${id}?populate=*`;

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
	return data.data.attributes.image.data.attributes.formats.large.url;
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const data = await getGalleryItemFromDatabase(params.slug);

		const { title, caption, coverImage, artworks } = data;

		const artworkIds = artworks.data.map((artwork: ArtworkImage) => artwork.id);

		const artworkImages: Array<string> = await Promise.all(
			artworkIds.map((id: string) => getArtworkImageById(id))
		);

		return {
			title: title,
			caption: caption,
			coverImage: coverImage,
			artworkImages: artworkImages
		};
	} catch (e) {
		throw error(404, 'Not found');
	}
};
