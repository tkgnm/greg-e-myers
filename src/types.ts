export interface CoverImage extends ImageProperties {
	id: number;
	title: string;
	caption: string;
	alt: string;
	date: string;
}

export interface GalleryItem {
	title: string;
	caption: string;
	description: string;
	date: string;
	artworkIDs: Array<number>;
}

export interface ArtworkImage extends ImageProperties {
	title: string;
	alternativeText: string;
	caption: string;
	technicalDetail: string;
	hideCaption: boolean;
	date: string;
}

export interface ImageProperties {
	url: string;
	width: number;
	height: number;
}
