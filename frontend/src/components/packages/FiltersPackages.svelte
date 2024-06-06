<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	import packagesData from '#/packages.data';

	const categoriesSet = new Set();
	const providersSet = new Set();

	packagesData.forEach((pkg) => {
		pkg.categories?.forEach((category) => categoriesSet.add(category));
		providersSet.add(pkg.provider);
	});

	const categories = [...categoriesSet];
	const providers = [...providersSet];
</script>

<div class="w-1/4">
	<div class="mb-4">
		<p class="text-muted-foreground font-medium mb-2">Catégorie</p>
		<ul>
			{#each categories as category}
				<li class="hover:bg-muted p-1 rounded hover:cursor-pointer">
					{category}
				</li>
			{/each}
		</ul>
	</div>
	<div class="mb-4">
		<p class="text-muted-foreground font-medium mb-2">Providers</p>
		<ul class="flex flex-col gap-2">
			{#each providers as provider}
				<li class="flex items-center gap-2">
					<Checkbox id={String(provider)} /><Label for={String(provider)}>{provider}</Label>
				</li>
			{/each}
		</ul>
	</div>
</div>
