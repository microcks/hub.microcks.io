<script lang="ts">
	import { Root, List, Item, Link, Separator, Page } from '$lib/components/ui/breadcrumb/index';

	export let pkjSlug: string;
	export let pkjName: string;
	export let apiSlug: string | null = null;
	export let apiName: string | null = null;
</script>

<Root class="w-full border-b border-border mb-4 pb-4">
	<List>
		<Item>
			<Link href="/">Home</Link>
		</Item>
		<Separator />
		{#if apiSlug && apiName}
			<Item>
				<Link href={`/package/${pkjSlug}`}>{pkjName}</Link>
			</Item>
			<Separator />
			<Page>
				<Link href={`/package/${pkjSlug}/api/${apiSlug}`}>{apiName}</Link>
			</Page>
		{:else}
			<Page>
				<Link href={`/package/${pkjSlug}`}>{pkjName}</Link>
			</Page>
		{/if}
	</List>
</Root>
