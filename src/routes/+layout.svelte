<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<nav>
	<a href="/">Home</a>
	<a href="/bio">Bio</a>
	<a href="https://www.instagram.com/gregemyers/" target="_blank">Instagram ⬈</a>
	<a href="/contact">Contact</a>
</nav>

<slot />

<h2>Gallery</h2>
<div class="gallery-container">
	{#each data.items as item}
		<div class="gallery-item">
			<a href="/gallery/{item.id}">
				<img src={item.url} alt={item.alt} width="200px" />
				<p>{item.title}</p>
			</a>
		</div>
	{/each}
</div>

<style>
	.gallery-container {
		display: flex;
		flex-wrap: wrap;
		margin: -10px; /* Negative margin to offset the margins of gallery items */
	}

	.gallery-item {
		flex: 1 0 calc(20% - 20px); /* Adjust as needed; 20% means 5 images per row */
		margin: 10px; /* Adjust as needed */
		max-width: 200px;
		box-sizing: border-box; /* Include padding and border in the element's total width */
	}

	@media screen and (max-width: 768px) {
		.gallery-item {
			flex: 1 0 calc(50% - 20px); /* Adjust as needed */
		}
	}
</style>
