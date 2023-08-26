<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{@html data.title}, {@html data.date}</h1>

<!-- this should be changed to description -->
{#if data.caption !== null}
	<p>{@html data.caption}</p>
{/if}

<!-- this should be changed to body -->
{#if data.description !== null}
	<p>{@html data.description}</p>
{/if}

{#each data.artworkImages as img}
	<img src={img.url} alt={img.alternativeText} width={img.width} height={img.height} />
	{#if img.hideCaption === false && img.caption !== null}
		<p>{@html img.caption}</p>
	{/if}{/each}
