<script lang="ts">
	import type { Package } from '#/types';

	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionPackage from '$lib/components/pages/packages/DescriptionPakage.svelte';
	import ListApis from '$lib/components/pages/packages/ListApis.svelte';

	export let data;
	let packageData: Package = data.data;
</script>

{#if !packageData}
	<p>Loading...from page</p>
{:else}
	<section class="p-8 w-full">
		<Breadcrumb pkgName={packageData.name} pkgDisplayName={packageData.displayName} />
		<div class="w-full h-auto flex flex-row items-start p-4">
			<DescriptionPackage pkg={packageData} />
			<ListApis apiList={packageData.apis} pkg={packageData} />
		</div>
	</section>
{/if}
