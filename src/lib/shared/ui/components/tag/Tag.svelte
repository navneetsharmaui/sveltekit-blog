<script lang="ts">
	import { convertToSlug } from '$utils/convert-to-slug';

	export let tag!: string;
</script>

<a
	sveltekit:prefetch
	href="{`/tags/${convertToSlug(tag)}`}"
	aria-label="{tag}"
	class="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500"
>
	{tag.toUpperCase()}
</a>
