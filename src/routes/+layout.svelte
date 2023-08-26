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
{#each data.items as item}
	<div>
		<a href="/gallery/{item.id}">
			<img src={item.url} alt={item.alt} width={item.width} height={item.height} /><br />
			<caption>{item.caption}</caption>
		</a>
	</div>
{/each}
