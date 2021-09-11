import { EnvironmentName } from '$models/enums/environment-name.enum';
import { EnvironmentType } from '$models/enums/environment-type.enum';
import { SVELTEKIT_DATA_ENPOINTS_DEV, SVELTEKIT_SEARCH_ENPOINTS_DEV } from '$models/enums/sveltekit-endpoint.dev.enum';
import type { SVELTEKIT_STARTER_ENPOINT_CONFIG } from '$models/types/sveltekit-endpoits.type';
import type { ISveltekitStarterEnvironmentConfig } from '$models/interfaces/isveltekit-strater-environment.interface';

export const environment: ISveltekitStarterEnvironmentConfig<SVELTEKIT_STARTER_ENPOINT_CONFIG> = {
	name: EnvironmentName.DEVELOPMENT,
	environmentType: EnvironmentType.DEV,
	production: true,
	isDebugMode: false,
	launchURL: import.meta.env.SVELTEKIT_BLOG_BASE_URL,
	apiUrls: {
		CHUCK_NORRIS: import.meta.env.SVELTEKIT_BLOG_CHUCK_NORRIS_API_URL,
		IN_MEMORY: '',
		GITHUB: import.meta.env.SVELTEKIT_BLOG_GITHUB_API_URL,
	},
	chuckNorriesAPIConfig: {
		defaultAPILang: import.meta.env.SVELTEKIT_BLOG_CHUCK_NORRIS_API_LANG
			? import.meta.env.SVELTEKIT_BLOG_CHUCK_NORRIS_API_LANG
			: 'en-US',
		endPoints: {
			SEARCH: SVELTEKIT_SEARCH_ENPOINTS_DEV.SEARCH,
			SERVICE: SVELTEKIT_DATA_ENPOINTS_DEV.SERVICE,
		},
	},
	sessionConfig: {
		SESSION_KEY: import.meta.env.SVELTEKIT_BLOG_SESSION_KEY,
	},
	spotifyConfig: {
		SPOTIFY_CLIENT_BASIC: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_CLIENT_BASIC,
		SPOTIFY_CLIENT_ID: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_CLIENT_SECRET,
		SPOTIFY_REFRESH_TOKEN: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_REFRESH_TOKEN,
		SPOTIFY_NOW_PLAYING_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_NOW_PLAYING_ENDPOINT,
		SPOTIFY_TOP_TRACKS_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_TOP_TRACKS_ENDPOINT,
		SPOTIFY_TOKEN_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_SPOTIFY_TOKEN_ENDPOINT,
	},
	twitterConfig: {
		TWITTER_API_KEY: import.meta.env.SVELTEKIT_BLOG_TWITTER_API_KEY,
		TWITTER_TWEETS_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_TWITTER_TWEETS_ENDPOINT,
		TWITTER_SEARCH_URL: import.meta.env.SVELTEKIT_BLOG_TWITTER_SEARCH_URL,
	},
	gitHubConfig: {
		GITHUB_BLOG_EDIT_URL: import.meta.env.SVELTEKIT_BLOG_GITHUB_BLOG_EDIT_URL,
		GITHUB_SNIPPETS_EDIT_URL: import.meta.env.SVELTEKIT_BLOG_GITHUB_SNIPPETS_EDIT_URL,
		GITHUB_API_URL: import.meta.env.SVELTEKIT_BLOG_GITHUB_API_URL,
		GITHUB_USER_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_GITHUB_USER_ENDPOINT,
		GITHUB_USER_REPO_ENDPOINT: import.meta.env.SVELTEKIT_BLOG_GITHUB_USER_REPO_ENDPOINT,
	},
};
