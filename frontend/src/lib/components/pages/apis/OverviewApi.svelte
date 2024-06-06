<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { API } from '#/types';

	export let api: API;
</script>

<div class="w-1/4 flex flex-col items-start gap-4">
	<Button class="w-full">Install</Button>
	<div class="w-full bg-muted p-2 rounded">
		<p class="text-muted-foreground">Version: <span class="text-foreground">{api.version}</span></p>
	</div>
</div>
