<script lang="ts">
	export let href!: string;

	export let cssClasses = '';
</script>

{#if href}
	<a
		href="{href}"
		class="{cssClasses ? cssClasses : 'text-gray-500 hover:text-gray-600 transition'}"
		target="_blank"
		rel="noopener noreferrer"
	>
		<slot />
	</a>
{/if}
