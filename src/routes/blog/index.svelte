<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				blogs: await fetch('/blog.json').then((res) => res.json()),
			},
		};
	}
</script>

<script lang="ts">
	// Start: Local Imports
	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import BlogPost from '$components/blog-post/BlogPost.svelte';

	// Models
	import type { IBlog } from '$models/interfaces/iblog.interface';
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	// End: Local Imports

	export let blogs!: IBlog[];
	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: 'Blogs | Sveltekit Blog',
		description: 'Blog page of Sveltekit blog starter project',
		url: '/blog',
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter about'],
		searchUrl: '/blog',
	};

	const mostRecentBlogs: IBlog[] = blogs
		.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
		.slice(0, 3);

	let searchValue = '';
	$: filteredBlogPosts = blogs
		.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
		.filter((blog) => blog.title.toLowerCase().includes(searchValue.toLowerCase()));

	// End: Local component properties

	// Local Methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Blog page section -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white"> Blog </h1>
	<p class="text-gray-600 dark:text-gray-400 mb-4">
		There are {blogs.length} articles on this site. Use
		<a sveltekit:prefetch href="/tags" aria-label="tags" class="text-blue-500 hover:text-blue-700 transition"
			>tags</a
		>
		to get articles based on different tags. Use the search below to filter by title.
	</p>
	<!-- Start: Search blogs -->
	<div class="relative w-full mb-4">
		<input
			bind:value="{searchValue}"
			aria-label="Search articles"
			type="text"
			placeholder="Search articles"
			class="px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
		/>
		<svg
			class="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="{2}"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
		</svg>
	</div>
	<!-- End: Search blogs -->
	<!-- Start: Most Recent Blogs Section -->
	{#if !searchValue}
		<h2 class="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
			Most Recent
		</h2>
		{#each mostRecentBlogs as blog, index (blog.slug)}
			<BlogPost blog="{blog}" />
		{/each}
	{/if}
	<!-- End: Most Recent Blogs Section -->

	<!-- Start: All the blogs section -->
	<h2 class="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white"> All Posts </h2>
	{#if filteredBlogPosts.length === 0}
		<p class="text-gray-600 dark:text-gray-400 mb-4"> No posts found. </p>
	{:else}
		{#each filteredBlogPosts as blog, index (blog.slug)}
			<BlogPost blog="{blog}" />
		{/each}
	{/if}
</div>
<!-- End: All the blogs section -->

<!-- End: Blog page section -->
