<script lang="ts">
	import type { APIDetails, PackageDetails } from '#/types';

	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionApi from '$lib/components/pages/apis/DescriptionApi.svelte';
	import OverviewApi from '$lib/components/pages/apis/OverviewApi.svelte';

	export let data;

	let pkg: PackageDetails = data.packageData;
	let api: APIDetails = data.apiData;
</script>

{#if !api}
	<p>Loading...</p>
{:else}
	<section class="p-8 w-full">
		<Breadcrumb
			pkgName={pkg.name}
			pkgDisplayName={pkg.displayName}
			apiName={api.name}
			apiDisplayName={api.displayName}
		/>
		<div class="w-full h-auto flex flex-row items-start py-2">
			<DescriptionApi {pkg} {api} />
			<OverviewApi {api} />
		</div>
	</section>
{/if}
