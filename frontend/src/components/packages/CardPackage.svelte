<script lang="ts">
	import { stringToLowerCaseWithoutSpace } from '#/stringTransform';

	export let item: {
		id: number;
		name: string;
		provider: string;
		description: string;
		logo: string;
		categories: string[];
		apis: {
			id: number;
			name: string;
			description: string;
		}[];
	};

	const packageSlug: string = stringToLowerCaseWithoutSpace(item.provider);
</script>

<a
	class="border border-border w-full p-4 flex flex-col items-start rounded-lg hover:shadow hover:border-primary"
	href={`/package/${packageSlug}`}
>
	<img src={item.logo} alt={`${item.provider} logo`} class="w-auto h-12 mb-4" />
	<h3 class="font-normal text-lg mb-1">{item.name}</h3>
	<span class="text-muted-foreground mb-4">provided by {item.provider}</span>
	<p>{item.description}</p>
</a>
