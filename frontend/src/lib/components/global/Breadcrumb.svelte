<script lang="ts">
	import { Root, List, Item, Link, Separator, Page } from '$lib/components/ui/breadcrumb/index';

	export let pkgName: string;
	export let pkgDisplayName: string;
	export let apiName: string | null = null;
	export let apiDisplayName: string | null = null;
</script>

<Root class="w-full border-b border-border mb-4 pb-4">
	<List>
		<Item>
			<Link href="/">Home</Link>
		</Item>
		<Separator />
		{#if apiName && apiDisplayName}
			<Item>
				<Link href={`/package/${pkgName}`}>{pkgDisplayName}</Link>
			</Item>
			<Separator />
			<Page>
				<Link href={`/package/${pkgName}/api/${apiName}`}>{apiDisplayName}</Link>
			</Page>
		{:else}
			<Page>
				<Link href={`/package/${pkgName}`}>{pkgDisplayName}</Link>
			</Page>
		{/if}
	</List>
</Root>
