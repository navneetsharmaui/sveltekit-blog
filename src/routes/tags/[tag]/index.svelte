<script lang="ts" context="module">
	import { convertToSentence } from '$utils/convert-to-sentence';

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }: LoadInput) {
		try {
			const blogsPromise = await fetch(`/blog.json`);
			const blogs: IBlog[] = await blogsPromise.json();
			const blogsByTag = blogs.filter((post: IBlog) =>
				!post.tags ? [] : new RegExp(post.tags.join('|'), 'i').test(convertToSentence(page.params.tag)),
			);
			return { props: { blogs: blogsByTag, tag: page.params.tag } };
		} catch (error) {
			console.error(error);
		}
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
	import type { LoadInput } from '@sveltejs/kit';
	// End: Local Imports

	export let blogs!: IBlog[];
	export let tag!: string;
	// Start: Local component properties

	$: readableTag = convertToSentence(tag);
	/**
	 * @type {IMetaTagProperties}
	 */
	let metaData: Partial<IMetaTagProperties> = {
		title: `${convertToSentence(tag)} | Sveltekit`,
		description:
			'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		url: `/tags/${tag}`,
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter users', tag],
		searchUrl: `/tags/${tag}`,
	};

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
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white"> {readableTag} </h1>
	<p class="text-gray-600 dark:text-gray-400 mb-4">
		There {blogs.length > 1 ? `are ${blogs.length} articles` : `is ${blogs.length} article`} that belongs to the tag
		{readableTag}. Articles which belongs only to the tag {readableTag} will appear here. A particular article may belong
		to multiple tags. Use the search below to filter by title.
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

	<!-- Start: All the blogs section -->
	<h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white"> All Posts </h3>
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
