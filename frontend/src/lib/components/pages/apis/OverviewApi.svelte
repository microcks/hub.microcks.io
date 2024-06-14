<script lang="ts">
	import type { APIDetails, PackageDetails } from '#/types';

	import Button from '$lib/components/ui/button/button.svelte';

	export let pkg: PackageDetails;
	export let api: APIDetails;
</script>

<div class="w-2/5 flex flex-col items-start gap-4">
	<Button class="w-full">Install</Button>
	<div class="w-full bg-muted p-4 rounded flex flex-col items-start gap-2">
		<p class="text-muted-foreground">Version: <span class="text-foreground">{api.version}</span></p>
		<p class="text-muted-foreground">
			Provider: <span class="text-foreground">{pkg.provider}</span>
		</p>
		<p class="text-muted-foreground">
			Contract: <a class="text-foreground" href={api.contracts.url}>{api.contracts.type}</a>
		</p>
		<p class="text-muted-foreground">
			Created At: <span class="text-foreground">{api.createdAt}</span>
		</p>
	</div>
</div>
