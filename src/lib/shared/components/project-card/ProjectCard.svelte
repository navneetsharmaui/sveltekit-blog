<script lang="ts">
	import type { IProjectCard } from '$models/interfaces/iproject-card.interface';

	// Start: Local Imports
	// Components

	// Models

	// End: Local Imports

	// Start: Exported Properties
	/**
	 * @type {IBlogPostSummary}
	 */
	export let project!: IProjectCard;
	// End: Exported Properties

	// TODO
	let views = 2000;
</script>

{#if project && project?.slug}
	<div
		class="mb-4 hover:transition-shadow hover:shadow dark:hover:transition-shadow dark:hover:shadow flex items-center border border-gray-200 dark:border-gray-800 rounded p-4"
	>
		<div>
			<h3 class="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
				{project?.title}
			</h3>
			<p class="leading-5 text-gray-700 dark:text-gray-300">
				{project?.description}
			</p>
		</div>
	</div>
{/if}
