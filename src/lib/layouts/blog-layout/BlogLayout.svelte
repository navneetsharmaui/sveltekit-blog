<script lang="ts">
	import { parseISO, format } from 'date-fns';

	// Environment
	import { environment } from '$environment/environment';

	// Models
	import type { IBlogLayout } from '$models/interfaces/iblog-layout.interface';

	// Components
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
	import ShareButtons from '$ui/components/share-buttons/ShareButtons.svelte';
	import NextArticle from '$ui/components/next-article/NextArticle.svelte';
	import TagsContainer from '$ui/components/tags-container/TagsContainer.svelte';

	// Utils

	// Exports

	export let blog!: IBlogLayout;

	// Local Methods
	const editUrl = (slug: string): string => `${environment.gitHubConfig.GITHUB_BLOG_EDIT_URL}/${slug}/index.md`;
	const discussUrl = (slug: string): string =>
		`${environment.twitterConfig.TWITTER_SEARCH_URL}?q=${encodeURIComponent(
			`https://navneetsharma.io/blog/${slug}`,
		)}`;
</script>

<article class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		{blog.metadata.title}
	</h1>
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
		<div class="flex items-center">
			<img
				alt="{'Sveltekit Blogger'}"
				src="{'/images/author/sveltekit-blogger.svg'}"
				width="1.75rem"
				height="1.75rem"
				class="rounded-full w-7 h-7"
			/>
			<p class="text-sm text-gray-700 dark:text-gray-300 ml-2">
				{blog.metadata.author}
				{' / '}
				{format(parseISO(blog.metadata.date), 'MMMM dd, yyyy')}
			</p>
		</div>
		<p class="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
			{blog.metadata.readingTime}
		</p>
	</div>
	<div class="prose dark:prose-dark max-w-none w-full">
		<slot />
	</div>
	<div class="mt-8">
		<TagsContainer tags="{blog.metadata.tags}" />
	</div>
	<div class="mt-8">
		<p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{'Share the article on'}</p>
		<ShareButtons
			title="{blog.metadata.title}"
			description="{blog.metadata.description}"
			url="{`${environment.launchURL}/blog/${blog.metadata.slug}`}"
		/>
	</div>
	<div class="text-sm text-gray-700 dark:text-gray-300 mt-8">
		<ExternalLink
			href="{discussUrl(blog.metadata.slug)}"
			ariaLabel="{blog.metadata.title}"
			cssClasses="{'text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500'}"
		>
			{'Discuss on Twitter'}
		</ExternalLink>
		{` • `}
		<ExternalLink
			href="{editUrl(blog.metadata.slug)}"
			ariaLabel="{blog.metadata.title}"
			cssClasses="{'text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-500'}"
		>
			{'Edit on GitHub'}
		</ExternalLink>
	</div>
	<div class="mt-8 w-full">
		<NextArticle previousHref="{blog.previousArticleLink}" nextHref="{blog.nextArticleLink}" />
	</div>
</article>
