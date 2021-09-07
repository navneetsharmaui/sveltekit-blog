<script lang="ts">
	import Tag from '$ui/components/tag/Tag.svelte';

	export let tags!: string[];
</script>

{#if tags.length > 0}
	<div class="flex flex-row flex-wrap w-full mt-4 items-center">
		{#each tags as tag, index (tag)}
			<Tag tag="{tag}" />
			{#if index !== tags.length - 1}
				<p class="mr-2 ml-2 text-gray-500 dark:text-gray-50">
					{` • `}
				</p>
			{/if}
		{/each}
	</div>
{/if}
