<script lang="ts">
	import type { Package } from '#/types';

	import FiltersPackages from '$lib/components/packages/FiltersPackages.svelte';
	import GridPackages from '$lib/components/packages/GridPackages.svelte';

	export let packagesData: Package[] = [];
</script>

{#if !packagesData}
	<p>Loading...from section</p>
{:else}
	<section class="w-full h-auto flex flex-row gap-4 p-8">
		<FiltersPackages {packagesData} />
		<GridPackages {packagesData} />
	</section>
{/if}
