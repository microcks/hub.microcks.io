<script lang="ts">
	import type { Package } from '#/types';

	export let pkj: Package;
	console.log('CardPackage', pkj);
</script>

{#if !pkj}
	<p>Loading...</p>
{:else}
	<a
		class="border border-border w-full p-4 flex flex-col items-start rounded-lg hover:shadow hover:border-primary"
		href={`/package/${pkj.provider}`}
	>
		<img src={pkj.thumbUrl} alt={`${pkj.provider} logo`} class="w-auto h-12 mb-4" />
		<h3 class="font-normal text-lg mb-1">{pkj.name}</h3>
		<span class="text-muted-foreground mb-4">provided by {pkj.provider}</span>
		<p>{pkj.description}</p>
	</a>
{/if}
