<script lang="ts">
	import type { Package } from '#/types';

	export let pkg: Package;
</script>

{#if !pkg}
	<p>Loading...from card</p>
{:else}
	<a
		class="border border-border w-full p-4 flex flex-col items-start rounded-lg hover:shadow hover:border-primary"
		href={`/package/${pkg.name}`}
	>
		<img src={pkg.thumbUrl} alt={`${pkg.provider} logo`} class="w-auto h-12 mb-4" />
		<h3 class="font-normal text-lg">{pkg.displayName}</h3>
		<span class="text-muted-foreground mb-4">provided by {pkg.provider}</span>
		<p class="line-clamp-3">{pkg.description}</p>
	</a>
{/if}
