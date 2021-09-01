<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */

	export async function load({ page, fetch }) {
		const res = await fetch(`/blog/${page.params.slug}.json`);
		return {
			props: {
				blog: await res.json(),
			},
		};
	}
</script>

<script lang="ts">
	import BlogLayout from '$lib/layouts/blog-layout/BlogLayout.svelte';
	import type { IBlogMD } from '$models/interfaces/iblog-md.interface';

	export let blog!: IBlogMD;
</script>

<BlogLayout blog="{blog}">
	{#if blog}
		{@html blog.html}
	{/if}
</BlogLayout>
