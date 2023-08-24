<script lang="ts">
	import Gallery from '../components/Gallery.svelte';
</script>

<nav>
	<a href="/">Home</a>
	<a href="/bio">Bio</a>
	<a href="https://www.instagram.com/gregemyers/" target="_blank">Instagram ⬈</a>
	<a href="/contact">Contact</a>
</nav>
<slot />
<Gallery />
