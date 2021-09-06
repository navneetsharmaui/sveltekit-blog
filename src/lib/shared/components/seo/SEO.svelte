<script lang="ts">
	// Start: Local Imports
	// Models
	import type { IMetaTagProperties } from '$models/interfaces/imeta-tag-properties.interface';

	// Data
	import { environment } from '$environment/environment';
	// End: Local Imports

	// Start: Exported Properties
	/**
	 * @type {IMetaTagProperties}
	 */
	export let metaData: Partial<IMetaTagProperties> = {};
	// End: Exported Properties

	metaData = {
		...metaData,
		robots: 'index,follow',
		openGraph: {
			...metaData.openGraph,
			title: metaData.title,
			description: metaData.description,
			url: metaData.url
				? environment.launchURL
					? `${environment.launchURL}${metaData.url}`
					: `${metaData.url}`
				: environment.launchURL
				? environment.launchURL
				: '/',
			locale: 'en_US',
		},
		twitter: {
			...metaData.twitter,
			title: metaData.title,
			description: metaData.description,
			site: metaData.url
				? environment.launchURL
					? `${environment.launchURL}${metaData.url}`
					: `${metaData.url}`
				: environment.launchURL
				? environment.launchURL
				: '/',
		},
		url: metaData.url
			? environment.launchURL
				? `${environment.launchURL}${metaData.url}`
				: `${metaData.url}`
			: environment.launchURL
			? environment.launchURL
			: '/',
		searchUrl: metaData.url
			? environment.launchURL
				? `${environment.launchURL}${metaData.url}`
				: `${metaData.url}`
			: environment.launchURL
			? environment.launchURL
			: '/',
	};

	const jsonLd = (content) => `<${'script'} type="application/ld+json">${JSON.stringify(content)}</${'script'}>`;

	$: {
		if (!!metaData.image && typeof metaData.image === 'string') {
			metaData.openGraph = {
				...metaData.openGraph,
				image: metaData.image,
			};
			metaData.twitter = {
				...metaData.twitter,
				image: metaData.image,
			};
		}
		if (typeof metaData.image === 'object') {
			metaData.openGraph = {
				...metaData.openGraph,
				image: metaData.url
					? environment.launchURL
						? `${environment.launchURL}${metaData.url}`
						: `${metaData.url}`
					: environment.launchURL
					? environment.launchURL
					: '/',
				'image:width': metaData.image.width,
				'image:height': metaData.image.height,
				'image:alt': metaData.image.alt || metaData.title,
			};
			metaData.twitter = {
				...metaData.twitter,
				image: metaData.url
					? environment.launchURL
						? `${environment.launchURL}${metaData.url}`
						: `${metaData.url}`
					: environment.launchURL
					? environment.launchURL
					: '/',
				'image:alt': metaData.image.alt || metaData.title,
			};
		}
	}

	const isProd = environment.production;
</script>

<svelte:head>
	<meta name="robots" content="{metaData.robots}" />
	<meta name="googlebot" content="{metaData.robots}" />

	{#if isProd}
		<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
	{/if}

	{#if metaData && metaData.title}
		<title>{metaData.title}</title>
		<meta name="title" content="{metaData.title}" />
	{/if}

	{#if metaData && metaData.description}
		<meta name="description" content="{metaData.description}" />
	{/if}

	{#if metaData && metaData.keywords}
		<meta name="keywords" content="{metaData.keywords.join(', ')}" />
	{/if}

	{#if metaData && metaData.url}
		<link rel="canonical" href="{metaData.url}" />
	{/if}

	{#if metaData && metaData.rss}
		<link rel="alternate" type="application/rss+xml" title="RSS Feed" href="{metaData.rss}" />
	{/if}

	{#if metaData && metaData.atom}
		<link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="{metaData.atom}" />
	{/if}

	{#if metaData && metaData.twitter}
		<meta name="twitter:card" content="summary_large_image" />

		{#each Object.keys(metaData.twitter) as tag}
			<meta name="twitter:{tag}" content="{metaData.twitter[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.openGraph}
		{#each Object.keys(metaData.openGraph) as tag}
			<meta name="og:{tag}" content="{metaData.openGraph[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.article}
		{#each Object.keys(metaData.article) as tag}
			<meta name="article:{tag}" content="{metaData.article[tag]}" />
		{/each}
	{/if}

	{#if metaData && metaData.url}
		{@html jsonLd({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			url: metaData.url,
			logo: `/favicon.ico`,
		})}
	{/if}

	{#if metaData && metaData.url && metaData.searchUrl}
		{@html jsonLd({
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			url: metaData.url,
			potentialAction: {
				'@type': 'SearchAction',
				target: metaData.searchUrl,
				'query-input': 'required name=search_term_string',
			},
		})}
	{/if}
</svelte:head>
