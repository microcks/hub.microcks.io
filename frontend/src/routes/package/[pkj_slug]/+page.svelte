<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '@/global/Breadcrumb.svelte';
	import packagesData from '#/packages.data';
	import type { Package } from '#/types';

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

	console.log(packageData);
</script>

<section class="w-full p-8">
	{#if error}
		<p class="text-red-500">{error}</p>
	{:else if packageData}
		<Breadcrumb {slug} packageName={packageData.name} />
		<p>The slug is {slug}</p>
		<p>Package Name: {packageData.name}</p>
		<p>Provider: {packageData.provider}</p>
		<p>Description: {packageData.description}</p>
		<img src={packageData.logo} alt={`${packageData.provider} logo`} class="w-auto h-12 mb-4" />
	{/if}
</section>
