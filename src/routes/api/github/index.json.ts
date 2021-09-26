import { environment } from '$environment/environment';
import fetch from 'node-fetch';

const GITHUB_USER_ENDPOINT = environment.gitHubConfig.GITHUB_USER_ENDPOINT
	? `${environment.gitHubConfig.GITHUB_USER_ENDPOINT.trim().slice()}`
	: 'https://api.github.com/users/navneetsharmaui';
const GITHUB_USER_REPO_ENDPOINT = environment.gitHubConfig.GITHUB_USER_REPO_ENDPOINT
	? `${environment.gitHubConfig.GITHUB_USER_REPO_ENDPOINT.trim().slice()}?per_page=100`
	: 'https://api.github.com/users/navneetsharmaui/repos?per_page=100';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({
	query,
}: {
	query: URLSearchParams;
}): Promise<
	| {
			status: number;
			headers?: {
				[key: string]: string;
			};
			body?: {
				followers: unknown;
				stars: unknown;
			};
	  }
	| {
			status: number;
			headers?: {
				[key: string]: string;
			};
			body: {
				followers: unknown;
				stars: unknown;
			};
	  }
> {
	const limit = Number(query.get('limit') ?? 10);

	if (Number.isNaN(limit)) {
		return {
			status: 400,
		};
	}

	const githubUser = await fetch(GITHUB_USER_ENDPOINT);
	const githubUserRepos = await fetch(GITHUB_USER_REPO_ENDPOINT);

	const user = await githubUser.json();
	const allRespos = await githubUserRepos.json();

	const reposWithoutFork = allRespos.filter((repo: { fork: unknown }) => !repo.fork);
	const stars = reposWithoutFork.reduce(
		(accumulator: unknown, repo: { [x: string]: unknown }) => `${accumulator} ${repo['stargazers_count']}`,
		0,
	);
	return {
		status: 200,
		headers: {
			'Cache-Control': 'public, s-maxage=1200, stale-while-revalidate=600',
		},
		body: { followers: user.followers, stars },
	};
}
