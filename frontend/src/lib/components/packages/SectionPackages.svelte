<script lang="ts">
	import type { Package } from '#/types';

	import FiltersPackages from '$lib/components/packages/FiltersPackages.svelte';
	import GridPackages from '$lib/components/packages/GridPackages.svelte';

	export let packagesData: Package[];
	console.log('SectionPackage.svelte', packagesData);
</script>

{#if !packagesData}
	<p>Loading...</p>
{:else}
	<section class="w-full h-auto flex flex-row gap-4 p-8">
		<FiltersPackages />
		<GridPackages {packagesData} />
	</section>
{/if}
