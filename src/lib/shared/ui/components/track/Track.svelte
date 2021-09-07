<script lang="ts">
	// Start: Local Imports

	// Models
	import type { ITopTrack } from '$models/interfaces/itop-track.interface';

	// UI Components
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
	// End: Local Imports

	export let track!: ITopTrack;
</script>

{#if track}
	<div class="flex flex-row items-baseline border-b border-gray-100 dark:border-gray-800 max-w-3xl w-full mt-8">
		<p class="text-sm font-bold text-gray-400 dark:text-gray-600">
			{track.ranking}
		</p>
		<div class="flex flex-col pl-3">
			<ExternalLink
				href="{track.songUrl}"
				cssClasses="{'font-medium text-gray-900 dark:text-gray-100 truncate w-60 sm:w-96 md:w-full'}"
				ariaLabel="{track.title}"
			>
				{track.title}
			</ExternalLink>
			<p class="text-gray-500 mb-4 truncate w-60 sm:w-96 md:w-full" color="gray.500">
				{track.artist}
			</p>
		</div>
	</div>
{/if}
