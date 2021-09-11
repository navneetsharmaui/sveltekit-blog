<script lang="ts">
	export let title = '';
	export let description = '';
	export let slug = '';
	export let logo = '';
</script>

<a
	sveltekit:prefetch
	href="{`/snippets/${slug}`}"
	class="border border-grey-200 dark:border-gray-900 rounded filter hover:shadow-md dark:hover:shadow-dark p-4 w-full"
>
	<img alt="{title}" height="{32}" width="{32}" src="{`/logos/${logo}`}" class="filter drop-shadow rounded-full" />
	<h3 class="text-lg font-bold text-left mt-2 text-gray-900 dark:text-gray-100">
		{title}
	</h3>
	<p class="mt-1 text-gray-700 dark:text-gray-400">{description}</p>
</a>
