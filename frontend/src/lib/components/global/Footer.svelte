<script lang="ts">
	import Twitter from 'lucide-svelte/icons/twitter';
	import Linkedin from 'lucide-svelte/icons/linkedin';
	import Youtube from 'lucide-svelte/icons/youtube';
	import Github from 'lucide-svelte/icons/github';

	import Button from '$lib/components/ui/button/button.svelte';
	import microcksLogo from '../../../assets/images/microcks.svg';

	const navigationItems = [
		{
			title: 'About',
			items: [
				{
					title: 'What is Microcks ?',
					href: 'https://microcks.io'
				},
				{
					title: 'About Hub.Microcks.io',
					href: 'https://microcks.io/blog/microcks-hub-announcement/'
				},
				{
					title: 'Documentation',
					href: 'https://microcks.io/documentation/getting-started/'
				},
				{
					title: 'Privacy Policy',
					href: 'https://www.linuxfoundation.org/legal/privacy-policy'
				}
			]
		}
	];
</script>

<footer class="w-full py-8 text-foreground">
	<div class="container mx-auto">
		<div class="grid lg:grid-cols-2 gap-10 items-center">
			<div class="flex gap-8 flex-col items-start">
				<div class="flex gap-4 flex-col">
					<img src={microcksLogo} alt="Microcks logo" class="w-36 h-36" />
					<h2 class="text-lg md:text-2xl max-w-xl font-regular text-left">Microcks</h2>
					<p class="text-lg max-w-lg text-foreground/75 text-left">
						Microcks is an open source Kubernetes native platform for mocking APIs and
						microservices, allowing contract testing in an automated and scalable way.
					</p>
					<a href="https://microcks.io/documentation/getting-started/" target="_blank">
						<Button>Jump start with Microcks</Button>
					</a>
				</div>
			</div>
			<div class="grid lg:grid-cols-1 gap-10 items-start">
				{#each navigationItems as item (item.title)}
					<div class="flex text-base gap-1 flex-col items-center">
						<div class="flex flex-col gap-2">
							<p class="text-xl">{item.title}</p>
							{#if item.items}
								{#each item.items as subItem (subItem.title)}
									<a href={subItem.href} class="flex justify-between items-center" target="_blank">
										<span class="text-foreground/75 hover:text-primary">{subItem.title}</span>
									</a>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-full h-auto py-6 flex row items-center justify-center gap-2">
			<a
				class="text-foreground p-2 rounded-full flex items-center w-auto h-auto border border-foreground hover:text-primary hover:border-primary"
				href="https://twitter.com/microcksio"
				target="_blank"
			>
				<Twitter strokeWidth={1} />
			</a>
			<a
				class="text-foreground p-2 rounded-full flex items-center w-auto h-auto border border-foreground hover:text-primary hover:border-primary"
				href="https://www.linkedin.com/company/microcks/"
				target="_blank"
			>
				<Linkedin strokeWidth={1} />
			</a>
			<a
				class="text-foreground p-2 rounded-full flex items-center w-auto h-auto border border-foreground hover:text-primary hover:border-primary"
				href="https://www.youtube.com/c/Microcks"
				target="_blank"
			>
				<Youtube strokeWidth={1} />
			</a>
			<a
				class="text-foreground p-2 rounded-full flex items-center w-auto h-auto border border-foreground hover:text-primary hover:border-primary"
				href="https://github.com/microcks"
				target="_blank"
			>
				<Github strokeWidth={1} />
			</a>
		</div>
	</div>
</footer>
