<script lang="ts">
	import type { Package, API } from '#/types';

	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionPackage from '$lib/components/pages/packages/DescriptionPakage.svelte';
	import ListApis from '$lib/components/pages/packages/ListApis.svelte';

	export let data;
	let packageData: Package = data.packageData;
	let apisData: API[] = data.apisData;
</script>

{#if !packageData}
	<p>Loading...from page</p>
{:else}
	<section class="p-8 w-full">
		<Breadcrumb pkgName={packageData.name} pkgDisplayName={packageData.displayName} />
		<div class="w-full h-auto flex flex-row items-start p-4">
			<DescriptionPackage pkg={packageData} />
			<ListApis {apisData} pkg={packageData} />
		</div>
	</section>
{/if}
