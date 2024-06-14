<script lang="ts">
	import { page } from '$app/stores';

	import Breadcrumb from '$lib/components/global/Breadcrumb.svelte';
	import DescriptionPackage from '$lib/components/pages/packages/DescriptionPakage.svelte';
	import ListApis from '$lib/components/pages/packages/ListApis.svelte';

	import packagesData from '#/packages.data';

	const slug = $page.params.pkj_slug;

	let error: string | null = null;

	const packageData = packagesData.find((pkj) => {
		return pkj.slug === slug;
	});

	if (!packageData) {
		error = `No package found with slug: ${slug}`;
	} else {
		error = null;
	}
</script>

<div class="w-full p-8">
	{#if error}
		<p class="text-red-500">{error}</p>
	{:else if packageData}
		<Breadcrumb pkjSlug={slug} pkjName={packageData.name} />
		<section class="w-full h-auto flex flex-row items-start">
			<DescriptionPackage pkj={packageData} />
			<ListApis apiList={packageData.apis} pkj={packageData} />
		</section>
	{/if}
</div>
