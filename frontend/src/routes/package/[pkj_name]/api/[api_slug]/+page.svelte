<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionApi from '$lib/components/pages/apis/DescriptionApi.svelte';
	import OverviewApi from '$lib/components/pages/apis/OverviewApi.svelte';

	import packagesData from '#/packages.data';

	const pkjSlug = $page.params.pkj_slug;
	const apiSlug = $page.params.api_slug;

	let error: string | null = null;

	const packageData = packagesData.find((pkj) => {
		return pkj.slug === pkjSlug;
	});

	if (!packageData) {
		error = `No package found with slug: ${pkjSlug}`;
	} else {
		error = null;
	}

	const apiData = packageData?.apis.find((api) => {
		return api.slug === apiSlug;
	});

	if (!apiData) {
		error = `No API found with slug: ${apiSlug}`;
	} else {
		error = null;
	}
</script>

<div class="w-full p-8">
	{#if error}
		<p class="text-red-500">{error}</p>
	{:else if packageData && apiData}
		<Breadcrumb
			{pkjSlug}
			pkjName={packageData.name}
			apiSlug={apiData.slug}
			apiName={apiData.name}
		/>
		<section class="w-full h-auto flex flex-row items-start py-2">
			<DescriptionApi pkj={packageData} api={apiData} />
			<OverviewApi api={apiData} />
		</section>
	{/if}
</div>
