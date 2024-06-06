<script lang="ts">
	import CardPackage from '$lib/components/packages/CardPackage.svelte';
	import packagesData from '#/packages.data';

	const nbPackages = packagesData.length;
	const nbApis = packagesData.reduce((acc, pkg) => acc + (pkg.apis ? pkg.apis.length : 0), 0);
</script>

<div class="w-3/4">
	<p class="w-full pb-2 border-b border-border text-muted-foreground mb-6">
		<span class="text-foreground">{nbPackages}</span> packages,
		<span class="text-foreground">{nbApis}</span> APIs
	</p>
	<div class="w-full h-auto grid grid-cols-3 gap-4">
		{#each packagesData as item (item.id)}
			<CardPackage {item} />
		{/each}
	</div>
</div>
