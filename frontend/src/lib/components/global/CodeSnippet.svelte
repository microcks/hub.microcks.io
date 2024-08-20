<script lang="ts">
	import Clipboard from 'lucide-svelte/icons/clipboard';
	import ClipboardCheck from 'lucide-svelte/icons/clipboard-check';

	import copyToClipboard from '#/copyToClipboard';

	import Button from '$lib/components/ui/button/button.svelte';

	export let code: string = '';

	let copied = false;
</script>

<div
	class="w-full bg-muted rounded relative flex flex-col items-start justify-start pt-5 pr-0 pb-0 pl-5 my-2 group"
>
	<Button
		size={'icon'}
		class="absolute right-3 top-3 hidden group-hover:flex"
		on:click={async () => {
			await copyToClipboard(code);
			copied = true;
		}}
	>
		{#if copied}
			<ClipboardCheck />
		{:else}
			<Clipboard />
		{/if}
	</Button>
	<pre class="flex flex-col items-center justify-center">
        <code class="flex flex-col items-center justify-center text-balance">
            {code}
        </code>
    </pre>
</div>
