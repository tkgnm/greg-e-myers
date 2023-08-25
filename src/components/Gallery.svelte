<script lang="ts">
	import { fetchGalleryImages } from '$lib/apiService';
	import type { GalleryImage } from '../types';
	import { onMount } from 'svelte';

	let galleryImages: GalleryImage[] = [];

	onMount(async () => {
		galleryImages = await fetchGalleryImages();
	});
</script>

<div>
	{#if galleryImages.length > 0}
		{#each galleryImages as image}
			<div class="image-item">
				<img src={image.url} alt={image.alt} />
				<h3>{image.title}</h3>
				<p>{image.caption}</p>
			</div>
		{/each}
	{:else}
		<p>Loading gallery images...</p>
	{/if}
</div>
