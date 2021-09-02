<script lang="ts">
	import { parseISO, format } from 'date-fns';

	import { environment } from '$environment/environment';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
	import type { IBlogLayout } from '$lib/models/interfaces/iblog-layout.interface';
	import ShareButtons from '$lib/shared/ui/components/share-buttons/ShareButtons.svelte';

	// Exports

	export let blog!: IBlogLayout;

	// Local Methods
	const editUrl = (slug: string): string => `${environment.gitHubConfig.GITHUB_BLOG_EDIT_URL}/${slug}.mdsvex`;
	const discussUrl = (slug: string): string =>
		`${environment.twitterConfig.TWITTER_SEARCH_URL}?q=${encodeURIComponent(
			`https://navneetsharma.io/blog/${slug}`,
		)}`;
</script>

<article class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		{blog.title}
	</h1>
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
		<div class="flex items-center">
			<!-- <img alt="{'Navneet Sharma'}" height="24px" width="24px" src="/avatar.jpg" class="rounded-full" /> -->
			<p class="text-sm text-gray-700 dark:text-gray-300 ml-2">
				{blog.author}
				{' / '}
				{format(parseISO(blog.publishedAt), 'MMMM dd, yyyy')}
			</p>
		</div>
		<p class="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
			{blog.readingTime}
		</p>
	</div>
	<div class="prose dark:prose-dark max-w-none w-full">
		<slot />
	</div>
	<div class="mt-8">
		<ShareButtons title={blog.title} description={blog.summary} url={`${environment.launchURL}/blog/${blog.slug}`} />
	</div>
	<div class="mt-8">
		<!-- newsletter subscription -->
	</div>
	<div class="text-sm text-gray-700 dark:text-gray-300">
		<ExternalLink href="{discussUrl(blog.slug)}" ariaLabel="{blog.title}">
			{'Discuss on Twitter'}
		</ExternalLink>
		{` • `}
		<ExternalLink href="{editUrl(blog.slug)}" ariaLabel="{blog.title}">
			{'Edit on GitHub'}
		</ExternalLink>
	</div>
</article>
