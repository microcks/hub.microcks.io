<script lang="ts">
	import MoveRight from 'lucide-svelte/icons/move-right';

	import Button from '$lib/components/ui/button/button.svelte';
</script>

<aside
	class="w-full h-auto p-8 flex flex-row items-center justify-center gap-4 border-t-2 border-b-2"
>
	<h2 class="text-xl">List your APi mocks on hub.microcks.io</h2>
	<a href="/doc/how-to-contribute">
		<Button>
			Submit your mocks
			<MoveRight size={16} />
		</Button>
	</a>
</aside>
