<script lang="ts">
	import type { API, Package } from '#/types';

	import CardApi from '$lib/components/pages/packages/CardApi.svelte';

	export let apisData: API[];
	export let pkg: Package;
</script>

{#if !apisData || !pkg}
	<p>Loading...from ListApis</p>
{:else}
	<div class="w-2/5 flex flex-col items-start">
		<h2 class="text-lg mb-4">Available APIs</h2>
		<ul class="flex flex-col items-start gap-2 w-full">
			{#each apisData as api (api.name)}
				<CardApi {pkg} {api} />
			{/each}
		</ul>
	</div>
{/if}
