<script lang="ts">
	import type { PackageDetails, APIDetails } from '#/types';

	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionPackage from '$lib/components/pages/packages/DescriptionPakage.svelte';
	import ListApis from '$lib/components/pages/packages/ListApis.svelte';

	export let data;

	let pkg: PackageDetails = data.packageData;
	let apisData: APIDetails[] = data.apisData;
</script>

{#if !pkg}
	<p>Loading...from page</p>
{:else}
	<section class="p-8 w-full">
		<Breadcrumb pkgName={pkg.name} pkgDisplayName={pkg.displayName} />
		<div class="w-full h-auto flex flex-row items-start gap-8 py-4">
			<DescriptionPackage {pkg} />
			<ListApis {apisData} {pkg} />
		</div>
	</section>
{/if}
