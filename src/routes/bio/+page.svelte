<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<title>Greg E Myers - Bio</title>
<meta
	name="description"
	content="A biography and curriculum vitae for visual artist Greg E Myers."
/>
{@html data.props.bio}
