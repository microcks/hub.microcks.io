<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';

	import Header from '$lib/components/global/Header.svelte';
	import Footer from '$lib/components/global/Footer.svelte';
	import SubmitSection from '$lib/components/global/SubmitSection.svelte';

	import '../app.css';
</script>

<main>
	<ModeWatcher />
	<Header />
	<slot />
	<SubmitSection />
	<Footer />
</main>
