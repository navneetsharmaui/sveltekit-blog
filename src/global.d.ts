/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

// Modules

/**
 * With these declarations images can be imported in the components.
 *
 * @example
 * ```svelte
 * 	<script lang=ts>
 * 		import logo from 'static/images/logo.svg';
 * 	</script>
 *
 * 	<img src="{logo}" />
 * ```
 */
declare module '*.gif' {
	const value: string;
	export = value;
}

declare module '*.jpg' {
	const value: string;
	export = value;
}

declare module '*.jpeg' {
	const value: string;
	export = value;
}

declare module '*.png' {
	const value: string;
	export = value;
}

declare module '*.JPG' {
	const value: string;
	export = value;
}

declare module '*.JPEG' {
	const value: string;
	export = value;
}

declare module '*.PNG' {
	const value: string;
	export = value;
}

declare module '*.svg' {
	const value: string;
	export = value;
}

declare module '*.wbep' {
	const value: string;
	export = value;
}

declare module 'svelte-awesome';

// Start: Interfaces

interface Locals {
	userid: string;
}

interface ImportMetaEnv {
	SVELTEKIT_BLOG_BASE_URL: string;
	SVELTEKIT_BLOG_CHUCK_NORRIS_API_URL: string;
	SVELTEKIT_BLOG_CHUCK_NORRIS_API_LANG: string;
	SVELTEKIT_BLOG_SPOTIFY_CLIENT_BASIC: string;
	SVELTEKIT_BLOG_SPOTIFY_CLIENT_ID: string;
	SVELTEKIT_BLOG_SPOTIFY_CLIENT_SECRET: string;
	SVELTEKIT_BLOG_SPOTIFY_REFRESH_TOKEN: string;
	SVELTEKIT_BLOG_SPOTIFY_NOW_PLAYING_ENDPOINT: string;
	SVELTEKIT_BLOG_SPOTIFY_TOP_TRACKS_ENDPOINT: string;
	SVELTEKIT_BLOG_SPOTIFY_TOKEN_ENDPOINT: string;
	SVELTEKIT_BLOG_SESSION_KEY: string;
	SVELTEKIT_BLOG_TWITTER_API_KEY: string;
	SVELTEKIT_BLOG_TWITTER_TWEETS_ENDPOINT: string;
	SVELTEKIT_BLOG_TWITTER_SEARCH_URL: string;
	SVELTEKIT_BLOG_GITHUB_API_URL: string;
	SVELTEKIT_BLOG_GITHUB_BLOG_EDIT_URL: string;
	SVELTEKIT_BLOG_GITHUB_SNIPPETS_EDIT_URL: string;
	SVELTEKIT_BLOG_GITHUB_USER_ENDPOINT: string;
	SVELTEKIT_BLOG_GITHUB_USER_REPO_ENDPOINT: string;
}
