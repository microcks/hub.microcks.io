<script lang="ts">
	export let data;
</script>

{#if !data}
	<p>Loading...</p>
{:else}
	<section class="p-8 w-full">
		{data}
	</section>
{/if}
