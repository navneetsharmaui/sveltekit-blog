<style lang="scss" type="text/scss">
</style>

<script lang="ts">
	// Start: External Imports
	// End: External Imports

	// Start: Svelte Imports
	// End: Svelte Imports

	// Start: Local Imports

	// Core services
	import { environment } from '$environment/environment';

	// Utils
	import { Logger, LoggerUtils } from '$lib/utils/logger/logger';

	// Components
	import HeadTags from '$components/head-tags/HeadTags.svelte';
	import BlogPost from '$components/blog-post/BlogPost.svelte';
	import ProjectCard from '$components/project-card/ProjectCard.svelte';

	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';
	import type { IBlogPostSummary } from '$models/interfaces/iblog-post-summary.interface';
	import type { IProjectCard } from '$models/interfaces/iproject-card.interface';
	// End: Local Imports

	// Start: Local component properties
	/**
	 * @type {IMetaTagProperties}
	 */
	const metaData: Partial<IMetaTagProperties> = {
		title: `${environment.name} | Sveltekit`,
		description:
			'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable project. (sveltekit, typescript, tailwindcss, postcss, husky, Storybook).',
		keywords: ['sveltekit', 'sveltekit starter', 'sveltekit starter home'],
	};

	const logger: Logger = LoggerUtils.getInstance('Index');

	const mostPopularBlogs: IBlogPostSummary[] = [
		{
			title: "What's new in Svelte: August 2021",
			summary: 'Shadow DOM, export and await - oh my!',
			slug: 'whats-new-in-svelte-august-2021',
		},
		{
			title: "What's new in Svelte: July 2021",
			summary: 'Keeping cool with fixes, TypeScript tooling and tonnes of new features',
			slug: 'whats-new-in-svelte-july-2021',
		},
		{
			title: "What's new in Svelte: June 2021",
			summary: 'Progress towards SvelteKit 1.0 and tighter TypeScript/Svelte integrations in language tools',
			slug: 'whats-new-in-svelte-june-2021',
		},
	];

	const projects: IProjectCard[] = [
		{
			title: 'Sveltekit Starter',
			description:
				'Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable web application.',
			slug: 'sveltekit-starter',
			icon: '',
		},
		{
			title: 'Sveltekit Blog',
			description:
				'A Sveltkit blog starter project to get up fast with sveltekit. Sveltekit starter project created with sveltekit, typescript, tailwindcss, postcss, husky, and storybook. The project has the structure set up for the scaleable web application.',
			slug: 'sveltekit-blog',
			icon: '',
		},
	];
	// End: Local component properties

	// Start: Local component methods

	// End: Local component methods
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->

<!-- Start: Home Page container -->
<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
		Hey, I’m Navneet Sharma
	</h1>
	<h2 class="prose text-gray-600 dark:text-gray-400 mb-16">
		I'm a developer and creator. I work as the Software Developer at XYZ. You’ve found my personal slice of the
		internet –&nbsp;
		{" while you're here or "}
		<a sveltekit:prefetch href="/about">learn more about me.</a>
	</h2>

	<!-- Start: Popular Blog Section -->
	<h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white"> Most Popular </h3>

	{#if mostPopularBlogs.length > 0}
		{#each mostPopularBlogs as blogPost}
			<BlogPost blog="{blogPost}" />
		{/each}
	{/if}
	<!-- End: Popular Blog Section -->

	<!-- Start: Top Projects -->
	<h3 class="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white"> Top Projects </h3>

	{#if projects.length > 0}
		{#each projects as project}
			<ProjectCard project="{project}" />
		{/each}
	{/if}
	<!-- End: Top Projects -->
</div>
<!-- End: Home Page container -->
