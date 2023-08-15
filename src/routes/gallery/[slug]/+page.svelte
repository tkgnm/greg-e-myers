<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>About this site</h1>
<p>{@html data.uuid}</p>
<p>{@html data.caption}</p>
<p>{@html data.title}</p>
{#each data.artworkImages as artworkImage}
	<img src={artworkImage} />
{/each}

<a href="/">Home</a>
