<script lang="ts">
	import { marked } from 'marked';

	export let data;

	let doc = marked(data.docData);
</script>

{#if !doc}
	<p>Loading...</p>
{:else}
	<section class="p-8 w-full">
		{@html doc}
	</section>
{/if}
