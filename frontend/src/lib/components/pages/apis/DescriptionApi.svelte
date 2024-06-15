<script lang="ts">
	import type { PackageDetails, APIDetails } from '#/types';

	export let pkg: PackageDetails;
	export let api: APIDetails;
</script>

<div class="w-3/5 p-4">
	<div class="flex flex-row items-center gap-6 w-full h-auto mb-8">
		<img src={api.thumbUrl} alt={`${pkg.provider} logo`} class="h-12 w-auto" />
		<div class="flex flex-col gap-1">
			<h1 class="text-2xl font-normal">{api.displayName}</h1>
			<p class="text-muted-foreground">Version {api.version}</p>
		</div>
	</div>
	<div class="w-full h-auto">
		<p>{api.description}</p>
	</div>
</div>
