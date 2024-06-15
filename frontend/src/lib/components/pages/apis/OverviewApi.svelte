<script lang="ts">
	import type { APIDetails, PackageDetails } from '#/types';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Trigger, Root } from '$lib/components/ui/alert-dialog';
	import DialogInstallApi from '$lib/components/pages/apis/DialogInstallApi.svelte';

	export let pkg: PackageDetails;
	export let api: APIDetails;
</script>

<div class="w-2/5 flex flex-col items-start gap-4">
	<Root>
		<Trigger class="w-full">
			<Button class="w-full">Install</Button>
		</Trigger>
		<div class="w-full bg-muted p-4 rounded flex flex-col items-start gap-2">
			<p class="text-muted-foreground">
				Version: <span class="text-foreground">{api.version}</span>
			</p>
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
		<DialogInstallApi {api} pkgProvider={pkg.name} />
	</Root>
</div>
