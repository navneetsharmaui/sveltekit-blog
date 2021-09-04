<script lang="ts" context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		return {
			props: {
				topTracks: await fetch(`/api/top-tracks.json`).then((res) => res.json()),
			},
		};
	}
</script>

<script lang="ts">
	// Local Imports

	// Components
	import TopTracks from '$components/top-tracks/TopTracks.svelte';

	// Models
	import type { ITopTrack } from '$models/interfaces/itop-track.interface';

	// Exports
	export let topTracks!: ITopTrack[];
</script>

<div class="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
	<h1 class="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white"> Dashboard </h1>
	<div class="mb-8">
		<p class="text-gray-600 dark:text-gray-400 mb-4">
			This the dashboard view for my portfolio to track the metric related to the various platforms I use and are
			availabe for the public use. Right now it just tracks GitHub metrics.
		</p>
	</div>
	<h2 class="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white"> Top Tracks </h2>
	<p class="text-gray-600 dark:text-gray-400 mb-4">
		Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.
	</p>
	<TopTracks topTracks="{topTracks}" />
</div>
