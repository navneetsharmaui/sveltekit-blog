import { EnvironmentName } from '$lib/models/enums/environment-name.enum';
import { EnvironmentType } from '$lib/models/enums/environment-type.enum';
import { SVELTEKIT_DATA_ENPOINTS_QA, SVELTEKIT_SEARCH_ENPOINTS_QA } from '$lib/models/enums/sveltekit-endpoint.qa.enum';
import type { SVELTEKIT_STARTER_ENPOINT_CONFIG } from '$lib/models/types/sveltekit-endpoits.type';

import type { ISveltekitStarterEnvironmentConfig } from '$models/interfaces/isveltekit-strater-environment.interface';

export const environment: ISveltekitStarterEnvironmentConfig<SVELTEKIT_STARTER_ENPOINT_CONFIG> = {
	name: EnvironmentName.QA,
	environmentType: EnvironmentType.QA,
	production: true,
	isDebugMode: false,
	lauchURL: import.meta.env.VITE_BASE_URL,
	apiUrls: {
		CHUCK_NORRIS: import.meta.env.VITE_CHUCK_NORRIS_API_URL,
		IN_MEMORY: '',
		GITHUB: import.meta.env.VITE_GITHUB_API_URL,
	},
	chuckNorriesAPIConfig: {
		defaultAPILang: import.meta.env.VITE_CHUCK_NORRIS_API_LANG
			? import.meta.env.VITE_CHUCK_NORRIS_API_LANG
			: 'en-US',
		endPoints: {
			SEARCH: SVELTEKIT_SEARCH_ENPOINTS_QA.SEARCH,
			SERVICE: SVELTEKIT_DATA_ENPOINTS_QA.SERVICE,
		},
	},
	sessionConfig: {
		SESSION_KEY: import.meta.env.VITE_SESSION_KEY,
	},
	spotifyConfig: {
		SPOTIFY_CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
		SPOTIFY_REFRESH_TOKEN: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN,
	},
	twitterConfig: {
		TWITTER_API_KEY: import.meta.env.VITE_TWITTER_API_KEY,
	},
};