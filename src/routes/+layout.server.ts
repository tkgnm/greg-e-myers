import type { LayoutServerLoad } from './$types';
import type { GalleryImage } from '../types';

export const config = {
	isr: {
		expiration: 60 * 10 // 10 minutes
	}
};

export const prerender = true;
export const load: LayoutServerLoad = async () => {
	return {
		items: await fetchGalleryImages()
	};
};

async function fetchGalleryImages(): Promise<GalleryImage[]> {
	const data = await getImageData();
	return data.props.galleryItems.map((item: any) => item.image);
}

async function getImageData() {
	try {
		const data = await getGalleryThumbnailsFromDatabase();
		return {
			props: {
				galleryItems: data.data.map((item: any) => {
					const { id, attributes } = item; // keep id
					const { title, caption, date, coverImage } = attributes; // keep all but coverImage
					const { url, width, height } = coverImage.data.attributes.formats.small;

					const image: GalleryImage = {
						id,
						title,
						caption,
						alt: caption,
						date,
						url,
						width,
						height
					};
					return {
						image
					};
				})
			}
		};
	} catch (e) {
		throw new Error('Failed to fetch gallery data');
	}
}

const getGalleryThumbnailsFromDatabase = async () => {
	const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;
	const API_URL = `https://gregemyers-api-fly.fly.dev/api/gallery-items?populate=*`;

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
	return data;
};
