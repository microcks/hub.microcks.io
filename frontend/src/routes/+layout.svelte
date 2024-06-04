<script>
	import { ModeWatcher } from "mode-watcher";

	import Header from "$lib/components/global/navigation/Header.svelte";

	import "../app.css";
</script>

<main>
	<ModeWatcher />
	<Header />
	<slot />
</main>