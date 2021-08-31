<script lang="ts">
	// Start: Local Imports
	// Models
	import type { ICompiledCSS } from '$models/interfaces/icompiled-css.interface';

	// Data
	import { sveltekitStarterEnvironmentFacade } from '$core/services/environment/environment.facade';
	// End: Local Imports

	// Start: Exported Properties
	export let cssFiles: ICompiledCSS[] = [];
	// End: Exported Properties

	const isProd = sveltekitStarterEnvironmentFacade.isProd;
</script>

<svelte:head>
	{#if cssFiles.length > 0 && isProd}
		{#each cssFiles as cssFile}
			<link rel="stylesheet" href="{cssFile.url}" />
		{/each}
	{/if}
</svelte:head>
