<script lang="ts">
	import { marked } from 'marked';

	import type { PackageDetails } from '#/types';

	export let pkg: PackageDetails;

	let description = marked(pkg.longDescription);
</script>

{#if !pkg}
	<p>Loading...</p>
{:else}
	<div class="w-3/5 p-4">
		<div class="flex flex-row items-center gap-6 w-full h-auto mb-8">
			<img src={pkg.thumbUrl} alt={`${pkg.provider} logo`} class="h-12 w-auto" />
			<div class="flex flex-col gap-2">
				<h1 class="text-2xl font-normal">{pkg.displayName}</h1>
			</div>
		</div>
		<div class="w-full h-auto">
			<p>{description}</p>
		</div>
	</div>
{/if}
