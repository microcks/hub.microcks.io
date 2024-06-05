<script lang="ts">
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
</script>

<div
	class="border border-border w-full p-4 flex flex-col items-start justify-center gap-2 rounded-lg"
>
	<div class="h-24 w-24 rounded bg-red-500"></div>
	<h3 class="font-normal text-lg">{item.name}</h3>
	<span class="text-foreground">provided by {item.provider}</span>
	<p>{item.description}</p>
</div>
