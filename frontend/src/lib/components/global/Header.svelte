<script lang="ts">
	import ModeToggle from '$lib/components/ui/mode-toggle/mode-toggle.svelte';
	import SearchbarHeader from '$lib/components/global/SearchbarHeader.svelte';
	import ContributeDropdown from '$lib/components/global/ContributeDropdown.svelte';
</script>

<header class="w-full h-auto p-8 flex flex-row items-center justify-between">
	<a href="/" class="text-xl font-normal"> Hub Microcks.io </a>
	<div class="flex flex-row items-center gap-2" data-sveltekit-preload-data="false">
		<SearchbarHeader />
		<ContributeDropdown />
		<ModeToggle />
	</div>
</header>
