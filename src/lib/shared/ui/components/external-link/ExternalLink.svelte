<script lang="ts">
	export let href = '';
</script>

<a href="{href}" class="text-gray-500 hover:text-gray-600 transition" target="_blank" rel="noopener noreferrer">
	<slot />
</a>
