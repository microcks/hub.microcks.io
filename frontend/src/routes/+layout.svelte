<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';

	import Header from '@/global/Header.svelte';
	import Footer from '@/global/Footer.svelte';
	import SubmitSection from '@/global/SubmitSection.svelte';

	import '../app.css';
</script>

<main>
	<ModeWatcher />
	<Header />
	<slot />
	<SubmitSection />
	<Footer />
</main>
