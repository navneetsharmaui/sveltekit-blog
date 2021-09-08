<script lang="ts">
	// Exports
	export let previousHref = '';

	export let nextHref = '';
</script>

<div class="flex flex-wrap mb-10 pt-2 pb-2">
	<div class="flex w-1/2 justify-start">
		{#if previousHref}
			<a sveltekit:prefetch href="{previousHref}" aria-label="previous">
				<small
					class="block text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500"
				>
					Previous article
				</small>
			</a>
		{/if}
	</div>
	<div class="flex w-1/2 justify-end">
		{#if nextHref}
			<a sveltekit:prefetch href="{nextHref}" aria-label="next">
				<small
					class="block text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500"
				>
					Next article
				</small>
			</a>
		{/if}
	</div>
</div>
