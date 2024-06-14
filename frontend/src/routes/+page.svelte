<script lang="ts">
	import type { Package } from '#/types';

	import HeroBanner from '$lib/components/global/HeroBanner.svelte';
	import SectionPackages from '$lib/components/packages/SectionPackages.svelte';

	export let data;
	let packagesData: Package[] = data.data;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

{#if !packagesData}
	<p>Loading...from page</p>
{:else}
	<section>
		<HeroBanner />
		<SectionPackages {packagesData} />
	</section>
{/if}
