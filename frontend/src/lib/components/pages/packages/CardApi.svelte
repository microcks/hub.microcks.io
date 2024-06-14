<script lang="ts">
	import type { Package, API } from '#/types';

	export let pkg: Package;
	export let api: API;
</script>

<li class="w-full border border-border hover:shadow hover:border-primary rounded-lg">
	<a href={`/package/${pkg.name}/api/${api.name}`} class="p-4 flex flex-row items-start gap-2">
		<img src={pkg.thumbUrl} alt={`${pkg.provider} logo`} class="h-10 w-auto" />
		<div class="flex flex-col items-start">
			<h3>
				{api.name}
			</h3>
		</div>
	</a>
</li>
