<script lang="ts">
	import type { Package, API } from '#/types';

	export let pkj: Package;
	export let api: API;
</script>

<li class="w-full border border-border hover:shadow hover:border-primary rounded-lg">
	<a
		href={`/package/${pkj.slug}/api/${api.slug}.${api.version}`}
		class="p-4 flex flex-row items-start gap-2"
	>
		<img src={pkj.logo} alt={`${pkj.provider} logo`} class="h-12 w-auto" />
		<div class="flex flex-col items-start">
			<h3>
				{api.name}
			</h3>
			<p class="text-sm text-muted-foreground">
				{api.description}
			</p>
		</div>
	</a>
</li>
