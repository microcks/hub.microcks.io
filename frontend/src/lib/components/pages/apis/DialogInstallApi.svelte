<script lang="ts">
	import type { APIDetails } from '#/types';

	import {
		Content,
		Header,
		Title,
		Description,
		Cancel,
		Action,
		Footer
	} from '$lib/components/ui/alert-dialog';
	import CodeString from '$lib/components/global/CodeString.svelte';
	import CodeSnippet from '$lib/components/global/CodeSnippet.svelte';

	export let pkgProvider: string;
	export let api: APIDetails;

	$: newJobApiUrl = `https://github.com/microcks/microcks-quickstarters/${api.name}`;
	$: newImportApiUrl = `microcks-cli importAPI ${pkgProvider}:${api.name} \
    --microcksURL=<microcks-service-api> \
    --keycloakClientId=<service-account> \
    --keycloakClientSecret=<service-account-secret>`;
</script>

<Content>
	<Header class="w-full flex-row items-center gap-6">
		<img src={api.thumbUrl} alt={`${api.displayName} logo`} class="w-16 h-auto" />
		<div class="flex flex-col items-start">
			<Title>{api.displayName}</Title>
			<Description>
				{api.version} provided by {pkgProvider}
			</Description>
		</div>
	</Header>
	<div class="w-full py-1">
		<div class="flex flex-col gap-2">
			<p>2 options for installing this API Mock into your Microcks instance:</p>
		</div>
		<ol class="flex flex-col items-start gap-4 my-4">
			<li>
				1. Create new Import Job(s) into Microcks UI, copy/pasting these URL(s):
				<CodeSnippet code={newJobApiUrl} />
			</li>
			<li>
				2. Use <CodeString string={'microcks-cli'} /> command line tool with the <CodeString
					string={'importAPI'}
				/>
				command:
				<CodeSnippet code={newImportApiUrl} />
			</li>
		</ol>
	</div>
	<Footer>
		<Cancel>Cancel</Cancel>
		<Action>Done</Action>
	</Footer>
</Content>
