<script lang="ts">
	import type { Package, APIDetails } from '#/types';

	export let pkg: Package;
	export let api: APIDetails;
</script>

<li class="w-full border border-border hover:shadow hover:border-primary rounded-lg">
	<a href={`/package/${pkg.name}/api/${api.name}`} class="p-4 flex flex-row items-center gap-3">
		<img src={api.thumbUrl} alt={`${pkg.provider} logo`} class="h-auto w-10" />
		<div class="flex flex-col items-start gap-1">
			<h3>
				{api.displayName}
			</h3>
			<p class="text-muted-foreground line-clamp-1">
				{api.description}
			</p>
		</div>
	</a>
</li>
