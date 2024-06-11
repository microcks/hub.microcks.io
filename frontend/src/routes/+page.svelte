<script lang="ts">
	import HeroBanner from '$lib/components/global/HeroBanner.svelte';
	import SectionPackages from '$lib/components/packages/SectionPackages.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<HeroBanner />
	<SectionPackages />
</section>
