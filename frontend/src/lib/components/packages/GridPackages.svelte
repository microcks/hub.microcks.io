<script lang="ts">
	import type { Package } from '#/types';

	import CardPackage from '$lib/components/packages/CardPackage.svelte';

	export let packagesData: Package[] = [];

	$: nbPackages = packagesData.length;
	$: nbApis = packagesData.reduce((acc, pkg) => acc + pkg.apis.length, 0);
</script>

{#if !packagesData}
	<p>Loading... from grid</p>
{:else}
	<div class="w-3/4">
		<p class="w-full pb-2 border-b border-border text-muted-foreground mb-6">
			<span class="text-foreground">{nbPackages}</span> packages,
			<span class="text-foreground">{nbApis}</span> APIs
		</p>
		<div class="w-full h-auto grid grid-cols-3 gap-4">
			{#each packagesData as pkg (pkg.name)}
				<CardPackage {pkg} />
			{/each}
		</div>
	</div>
{/if}
