export interface ArtworkImage {
	id: string;
	attributes: ImageData;
}

export interface GalleryImage {
	id: number;
	title: string;
	caption: string;
	alt: string;
	date: string;
	url: string;
	width: number;
	height: number;
}
