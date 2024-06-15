<script lang="ts">
	import type { Package } from '#/types';

	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let packagesData: Package[] = [];

	let categories = Array.from(new Set(packagesData.flatMap((pkg) => pkg.categories)));
	let providers = Array.from(new Set(packagesData.map((pkg) => pkg.provider)));
</script>

{#if !packagesData || !categories || !providers}
	<p>Loading...</p>
{:else}
	<div class="w-1/4">
		<div class="mb-4">
			<p class="text-muted-foreground font-medium mb-2">Catégorie</p>
			<ul class="flex flex-col gap-2">
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
					<li class="flex items-center gap-2 p-1">
						<Checkbox id={String(provider)} /><Label for={String(provider)}>{provider}</Label>
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}
