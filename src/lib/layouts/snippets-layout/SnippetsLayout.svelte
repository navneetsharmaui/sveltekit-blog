<script lang="ts">
	import { onMount } from 'svelte';

	// Environment
	import { environment } from '$environment/environment';

	// Models

	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
	import ShareButtons from '$ui/components/share-buttons/ShareButtons.svelte';

	// Utils
	import { blogTypeDate } from '$utils/date-formatters';
	import { readingTime } from '$lib/utils/reading-time';

	// Exports

	export let title = '';
	export let slug = '';
	export let description = '';
	export let tags = [];
	export let date = '';
	export let author = '';
	export let logo = '';

	let readingTimeDuration = '';

	const editUrl = `${environment.gitHubConfig.GITHUB_SNIPPETS_EDIT_URL}/${slug}/index.md`;
	const discussUrl = `${environment.twitterConfig.TWITTER_SEARCH_URL}?q=${encodeURIComponent(
		`https://sveltekit-blog-starter.vercel.app/snippets/${slug}`,
	)}`;

	/**
	 * @type {IMetaTagProperties}
	 */
	let metaData = {
		title: `${title} | Sveltekit`,
		description: `${description}`,
		url: `/snippets/${slug}`,
		keywords: ['sveltekit blog', 'sveltekit starter', 'svelte starter', 'svelte', ...tags],
		searchUrl: `/blog/${slug}`,
		image: `/images/snippets/${slug}/banner.jpg`,
		twitter: {
			label1: 'Written by',
			data1: author,
			label2: 'Published on',
			data2: blogTypeDate(date),
		},
		openGraph: {
			type: 'article',
		},
	};

	// Start: Reactive properties
	$: {
		if (title && slug) {
			metaData = {
				title: `${title} | Sveltekit`,
				url: `/snippets/${slug}`,
				keywords: ['sveltekit blog', 'sveltekit starter', 'svelte starter', 'svelte', ...tags],
				searchUrl: `/snippets/${slug}`,
				description: `${description}`,
				image: `/images/snippets/${slug}/banner.jpg`,
				twitter: {
					label1: 'Written by',
					data1: author,
					label2: 'Published on',
					data2: blogTypeDate(date),
				},
				openGraph: {
					type: 'article',
				},
			};
		}
	}
	// End: Reactive properties

	// Local Methods
	onMount(() => {
		readingTimeDuration = readingTime(`${document.getElementById('blog-conent').textContent}`).time;
	});
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<article class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
	<div class="flex justify-between w-full mb-8">
		<div>
			<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
				{title}
			</h1>
			<p class="text-gray-700 dark:text-gray-300">
				{description}
			</p>
		</div>
		<div class="mt-2 sm:mt-0">
			<img alt="{title}" height="{48}" width="{48}" src="{`/logos/${logo}`}" class="drop-shadow rounded-full" />
		</div>
	</div>
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
		<div class="flex items-center">
			<img
				alt="{'Sveltekit Blogger'}"
				src="{'/images/author/sveltekit-blogger.svg'}"
				class="rounded-full w-7 h-7"
			/>
			<p class="text-sm text-gray-700 dark:text-gray-300 ml-2">
				{author}
				{' / '}
				{blogTypeDate(date)}
			</p>
		</div>
		<p class="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
			{readingTimeDuration}
		</p>
	</div>
	<div class="prose dark:prose-dark max-w-none w-full" id="blog-conent">
		<slot />
	</div>
	<div class="mt-8">
		<p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{'Share the code snippet on'}</p>
		<ShareButtons title="{title}" description="{description}" url="{`${environment.launchURL}/snippets/${slug}`}" />
	</div>
	<div class="text-sm text-gray-700 dark:text-gray-300 mt-8">
		<ExternalLink
			href="{discussUrl}"
			ariaLabel="{title}"
			cssClasses="{'text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500'}"
		>
			{'Discuss on Twitter'}
		</ExternalLink>
		{` • `}
		<ExternalLink
			href="{editUrl}"
			ariaLabel="{title}"
			cssClasses="{'text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500'}"
		>
			{'Edit on GitHub'}
		</ExternalLink>
	</div>
</article>
