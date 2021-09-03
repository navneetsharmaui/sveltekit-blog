<script lang="ts">

	// Start: Local Imports
	// Components

	// Models
	import type { IBlog } from '$models/interfaces/iblog.interface';

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
	<a sveltekit:prefetch href="{`/blog/${blog.slug}`}" class="w-full">
		<div class="mb-8 w-full">
			<div class="flex flex-col md:flex-row justify-between">
				<h4 class="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100">
					{blog.title}
				</h4>
				<!-- <p class="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
					{`${views ? new Number(views).toLocaleString() : '–––'} views`}
				</p> -->
			</div>
			<p class="text-gray-600 dark:text-gray-400">{blog.summary}</p>
		</div>
	</a>
{/if}
