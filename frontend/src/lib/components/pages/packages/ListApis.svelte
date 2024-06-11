<script lang="ts">
	import CardApi from '$lib/components/pages/packages/CardApi.svelte';
	import type { API, Package } from '#/types';

	export let apiList: API[];
	export let pkj: Package;
</script>

<div class="w-1/4 flex flex-col items-start">
	<h2 class="text-lg mb-4">Available APIs</h2>
	<ul class="flex flex-col items-start gap-2 w-full">
		{#each apiList as api (api.name)}
			<CardApi {pkj} {api} />
		{/each}
	</ul>
</div>
