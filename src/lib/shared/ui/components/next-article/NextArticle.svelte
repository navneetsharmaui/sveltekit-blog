<script lang="ts">
	// Exports
	export let previousHref: string = '';

	export let nextHref: string = '';
</script>

<div class="flex flex-wrap mb-10 pt-2 pb-2">
	<div class="flex w-1/2 justify-start">
		{#if previousHref}
			<a sveltekit:prefetch href="{previousHref}" aria-label="previous">
				<small class="block text-sm text-gray-600"> Previous article </small>
			</a>
		{/if}
	</div>
	<div class="flex w-1/2 justify-end">
		{#if nextHref}
			<a sveltekit:prefetch href="{nextHref}" aria-label="next">
				<small class="block text-sm text-gray-600"> Next article </small>
			</a>
		{/if}
	</div>
</div>
