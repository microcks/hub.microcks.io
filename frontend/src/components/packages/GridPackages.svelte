<script lang="ts">
	import packagesData from '#/packages.data';

	import CardPackage from '@/packages/CardPackage.svelte';

	const nbPackages = packagesData.length;
</script>

<div class="w-3/4">
	<span class="w-full py-1 border-b border-border test-foreground">{{ nbPackages }} packages</span>
	<div class="w-full h-auto grid grid-cols-3 gap-4">
		{#each packagesData as item (item.id)}
			<CardPackage {item} />
		{/each}
	</div>
</div>
