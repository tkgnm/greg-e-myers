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

<aside>
	<h2>More posts</h2>
	<ul>
		{#each data.posts as post}
			<div>{post.alt}</div>
		{/each}
	</ul>
</aside>
