<script lang="ts">
	import type { LayoutData } from './$types';
	import '../lib/global.css';
	export let data: LayoutData;
</script>

<div class="page-container">
	<header class="centered-header">
		<img
			src="https://gregemyers-s3-images.s3.eu-west-2.amazonaws.com/banner_494d2bb9ae.jpeg"
			alt="Banner"
		/>

		<nav class="nav-links">
			<a href="/">Home</a>
			<a href="/bio">Bio</a>
			<a href="https://www.instagram.com/gregemyers/" target="_blank">Instagram ⬈</a>
			<a href="/contact">Contact</a>
		</nav>
	</header>

	<main>
		<slot />
	</main>

	<hr class="divider" />

	<div class="gallery-container">
		{#each data.items as item}
			<div class="gallery-item">
				<a href="/gallery/{item.id}">
					<div class="image-container">
						<img src={item.url} alt={item.alt} />
					</div>
					<div class="item-text">
						<strong>{item.title}</strong><br />
						<div class="item-caption">{item.caption}</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center; /* Center the content horizontally */
		text-align: center;
		max-width: 1024px; /* Adjust to your desired maximum width */
		margin: 0 auto; /* Center the container horizontally */
		padding-left: 20px; /* Add left padding */
		padding-right: 20px; /* Add right padding */
	}

	.centered-header {
		max-width: 1200px; /* Set a maximum width for the header content */
		width: 100%;
		padding: 20px;
	}

	.centered-header img {
		max-width: 100%;
	}

	.nav-links {
		display: flex;
		gap: 20px; /* Add padding between navigation links */
		margin-top: 20px; /* Add some space between the banner and navigation */
		justify-content: center; /* Center the navigation links horizontally */
	}

	.gallery-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 20px; /* Adjust the gap between items */
		max-width: 1200px;
		width: 100%;
		margin: 0 auto; /* Center the grid horizontally */
		justify-items: center; /* Center the items horizontally */
		padding-top: 20px;
	}

	.gallery-item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10px;
		border: 1px solid transparent; /* Start with a transparent border */
		transition: border-color 0.3s; /* Add a smooth transition for border color changes */
	}

	.gallery-item:hover {
		border-color: #ccc; /* Change the border color on hover */
	}

	/* Add this CSS to your existing <style> section */
	.image-container {
		width: 200px; /* Set your desired width */
		height: 130px; /* Set your desired height */
		overflow: hidden;
		position: relative;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.item-text {
		text-align: left;
		margin-top: 10px; /* Add some spacing between the image and text */
	}

	.item-caption {
		color: gray;
		font-size: 0.8rem;
	}

	.divider {
		width: 100px;
		border: 0.5px solid black; /* Add a black border as the divider */
		margin: 20px 0; /* Adjust the margin as needed */
	}
</style>
