<script lang="ts">
	import type { Package } from '#/types';

	export let item: Package;
</script>

<a
	class="border border-border w-full p-4 flex flex-col items-start rounded-lg hover:shadow hover:border-primary"
	href={`/package/${item.slug}`}
>
	<img src={item.logo} alt={`${item.provider} logo`} class="w-auto h-12 mb-4" />
	<h3 class="font-normal text-lg mb-1">{item.name}</h3>
	<span class="text-muted-foreground mb-4">provided by {item.provider}</span>
	<p>{item.description}</p>
</a>
