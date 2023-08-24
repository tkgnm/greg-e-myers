<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Bio</h1>
<p>{@html data.props.bio}</p>
