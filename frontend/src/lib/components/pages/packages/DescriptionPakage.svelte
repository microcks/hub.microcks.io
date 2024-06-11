<script lang="ts">
	import type { Package } from '#/types';

	export let pkj: Package;
</script>

<div class="w-3/4 py-2">
	<div class="flex flex-row items-center gap-4 w-full h-auto mb-8">
		<img src={pkj.logo} alt={`${pkj.provider} logo`} class="h-12 w-auto" />
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-normal">{pkj.name}</h1>
			<p class="text-muted-foreground">{pkj.description}</p>
		</div>
	</div>
	<div class="w-full h-auto">
		<p>{pkj.description}</p>
	</div>
</div>
