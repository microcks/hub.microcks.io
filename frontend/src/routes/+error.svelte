<script lang="ts">
	import { page } from '$app/stores';
</script>

<section class="w-full h-auto p-4 flex flex-col items-center justify-center">
	<h1 class="text-3xl font-semibold">
		{$page.error?.message}
	</h1>
</section>
