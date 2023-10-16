<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function getYearFromDate(dateString: string) {
		const date = new Date(dateString);
		return date.getFullYear();
	}
</script>

<title>Greg E Myers - {data.title}</title>
<meta name="description" content="Works featured in ${data.title} by Greg E Myers." />
<h2>{@html data.title}</h2>

<!-- this should be changed to body -->
{#if data.description !== null}
	<p>{@html data.description}</p>
{/if}

<div class="artwork-gallery">
	{#each data.artworkImages as img}
		<img src={img.url} alt={img.alternativeText} width={img.width} height={img.height} />
		{#if img.hideCaption === false && img.technicalDetail !== null}
			<div class="item-detail">
				<em>{@html img.title}</em>, {getYearFromDate(data.date)} <br />
				{@html img.technicalDetail}
			</div>
		{/if}
	{/each}
</div>

<style>
	h2 {
		text-decoration: underline;
	}
	.artwork-gallery {
		max-width: 600px; /* Adjust this value as needed */
		margin: 0 auto; /* Center the gallery horizontally */
		padding: 20px; /* Optional padding around the gallery */
		box-sizing: border-box; /* Include padding and border in the width */
		text-align: center; /* Center the images and captions */
	}

	.artwork-gallery img {
		max-width: 100%; /* Images will not exceed the width of the container */
		height: auto; /* Maintain aspect ratio */
	}

	.item-detail {
		padding: 10px 0 30px;
	}
</style>
