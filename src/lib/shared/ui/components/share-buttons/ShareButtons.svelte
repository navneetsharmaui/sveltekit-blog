<script lang="ts">
	import Icon from 'svelte-awesome';
	import { faReddit, faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';

	// Exports
	export let url!: string;
	export let title!: string;
	export let description!: string;

	// Local Properties

	const encodedURL = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const encodedDescription = encodeURIComponent(description);

	const linkStyles = 'inline-flex text-gray-700 hover:text-gray-800';
</script>

<ExternalLink
	href="{`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}"
	cssClasses="{linkStyles}"
	ariaLabel="{`Share ${title} on Facebook`}"
>
	<Icon data="{faFacebook}" class="mr-3" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}&summary=${encodedDescription}&source=LinkedIn`}"
	cssClasses="{linkStyles}"
	ariaLabel="{`Share ${title} on LinkedIn`}"
>
	<Icon data="{faLinkedin}" class="mx-3" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}"
	cssClasses="{linkStyles}"
	ariaLabel="{`Share ${title} on Twitter`}"
>
	<Icon data="{faTwitter}" class="mx-3" scale="{1.5}" />
</ExternalLink>
<ExternalLink
	href="{`https://www.reddit.com/submit?url=${encodedURL}&title=${encodedTitle}`}"
	cssClasses="{linkStyles}"
	ariaLabel="{`Share ${title} on Reddit`}"
>
	<Icon data="{faReddit}" class="mx-3" scale="{1.5}" />
</ExternalLink>
