import type { LayoutServerLoad } from './$types';
import type { CoverImage } from '../types';
import { fetchFromApi, API_ROUTES, convertToCloudfrontUrl } from '$lib/server/api';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	try {
		const data: CoverImage[] = await getCoverImages();

		const sortedItems = data.sort(
			(a: CoverImage, b: CoverImage) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

		return {
			items: sortedItems
		};
	} catch (e) {
		throw new Error('Failed to fetch gallery data');
	}
};

const getCoverImages = async (): Promise<CoverImage[]> => {
	try {
		const data = await fetchFromApi(API_ROUTES.galleryThumbnails);
		console.log('');

		return data.data.map((item: any) => {
			const { id, attributes } = item;
			const { title, caption, date, coverImage } = attributes;
			const { url, width, height } = coverImage.data.attributes.formats.small;
			const cloudFronturl = convertToCloudfrontUrl(url);
			const image: CoverImage = {
				id,
				title,
				caption,
				alt: caption,
				date,
				url: cloudFronturl,
				width,
				height
			};

			return image;
		});
	} catch (e) {
		throw new Error('Failed to fetch gallery data');
	}
};
