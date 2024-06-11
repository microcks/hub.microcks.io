<script lang="ts">
	import type { Package } from '#/types';

	import HeroBanner from '$lib/components/global/HeroBanner.svelte';
	import SectionPackages from '$lib/components/packages/SectionPackages.svelte';

	export let data: Package[];
	console.log('page.svelte', data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !data}
	<p>Loading...</p>
{:else}
	<section>
		<HeroBanner />
		<SectionPackages packagesData={data} />
	</section>
{/if}
