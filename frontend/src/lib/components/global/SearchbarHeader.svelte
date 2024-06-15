<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import Command from 'lucide-svelte/icons/command';

	import Input from '$lib/components/ui/input/input.svelte';
</script>

<div class="relative flex flex-row items-center text-muted-foreground">
	<Input placeholder="Search Microcks Hub..." size={48} class="w-full pl-10" />
	<Search class="absolute top-1/2 left-4 transform -translate-y-1/2" size={16} />
	<div
		class="absolute top-1/2 right-4 flex flex-row items-center justify-center text-muted-foreground transform -translate-y-1/2"
	>
		<Command size={16} />
		K
	</div>
</div>
