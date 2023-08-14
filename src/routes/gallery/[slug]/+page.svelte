<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>About this site</h1>
<p>{@html data.uuid}</p>
<p>{@html data.caption}</p>
<p>{@html data.title}</p>
<a href="/">Home</a>
