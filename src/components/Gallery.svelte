<script lang="ts">
	import { fetchGalleryImages } from '$lib/apiService';
	import type { GalleryImage } from '../types';

	let galleryImages: GalleryImage[] = [];

	async function loadGalleryImages() {
		galleryImages = await fetchGalleryImages();
	}

	export const load = () => {
		loadGalleryImages();
	};

	load();
</script>

<div>
	{#each galleryImages as image}
		<div class="image-item">
			<img src={image.url} alt={image.alt} />
			<h3>{image.title}</h3>
			<p>{image.caption}</p>
		</div>
	{/each}
</div>
