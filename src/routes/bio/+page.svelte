<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<title>Biography and CV</title>
{@html data.props.bio}
