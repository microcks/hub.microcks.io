<script lang="ts">
	import HeroBanner from '@/global/HeroBanner.svelte';
	import SectionPackages from '@/packages/SectionPackages.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<HeroBanner />
	<SectionPackages />
</section>
