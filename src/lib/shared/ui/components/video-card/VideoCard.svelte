<script lang="ts">
	import type { IVideoCard } from '$models/interfaces/ivideo-card.interface';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';

	export let video!: IVideoCard;
</script>

{#if video && video?.id && video?.snippet && video?.statistics}
	<ExternalLink
		href="{`https://www.youtube.com/watch?v=${video.id}`}"
		cssClasses="{'w-full'}"
		ariaLabel="{video.snippet.title}"
	>
		<div class="mb-8 w-full">
			<div class="flex flex-col md:flex-row justify-between">
				<h4 class="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
					{video.snippet.title}
				</h4>
				<p class="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
					{`${new Number(video.statistics.viewCount).toLocaleString()} views`}
				</p>
			</div>
			<p class="text-gray-600 dark:text-gray-400">
				{video.snippet.description.slice(0, 85) + '...'}
			</p>
		</div>
	</ExternalLink>
{/if}
