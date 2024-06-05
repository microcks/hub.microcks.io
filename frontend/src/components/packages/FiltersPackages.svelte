<script>
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
		<p class="text-muted-foreground font-medium mb-3">Catégorie</p>
		<ul>
			{#each categories as category}
				<li>
					{category.name}
				</li>
			{/each}
		</ul>
	</div>
	<div class="mb-4">
		<p class="text-muted-foreground font-medium mb-3">Providers</p>
		<ul>
			{#each providers as provider}
				<li>
					{provider.name}
				</li>
			{/each}
		</ul>
	</div>
</div>
