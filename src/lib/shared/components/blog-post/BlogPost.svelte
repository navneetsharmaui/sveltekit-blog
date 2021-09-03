<script lang="ts">
	// Start: Local Imports
	// Components

	// Models
	import type { IBlog } from '$models/interfaces/iblog.interface';

	import { convertToSlug } from '$utils/convert-to-slug';
	// End: Local Imports

	// Start: Exported Properties
	/**
	 * @type {IBlog}
	 */
	export let blog!: IBlog;
	// End: Exported Properties

	// TODO
</script>

{#if blog && blog?.slug}
	<div class="mb-8 w-full">
		<div class="flex flex-col md:flex-row justify-between">
			<a sveltekit:prefetch href="{`/blog/${blog.slug}`}" class="w-full">
				<h4 class="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
					{blog.title}
				</h4>
			</a>
			<!-- <p class="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
					{`${views ? new Number(views).toLocaleString() : '–––'} views`}
				</p> -->
		</div>
		<p class="text-gray-600 dark:text-gray-400">{blog.summary}</p>
		{#if blog.tags.length > 0}
			<div class="flex flex-row flex-wrap w-full mt-4 items-center">
				{#each blog.tags as tag, index (tag)}
					<a
						sveltekit:prefetch
						href="{`/blog/tags/${convertToSlug(tag)}`}"
						aria-label="{tag}"
						class="text-xs text-gray-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500"
					>
						{tag.toUpperCase()}
					</a>
					{#if index !== blog.tags.length - 1}
						<p class="mr-2 ml-2 text-gray-500 dark:text-gray-50">
							{` • `}
						</p>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
	<hr class="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
{/if}
