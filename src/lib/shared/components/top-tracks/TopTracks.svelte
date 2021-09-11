<script lang="ts">
	// Local Imports

	// Models
	import type { ITopTrack } from '$models/interfaces/itop-track.interface';

	// Components
	import Track from '$ui/components/track/Track.svelte';

	// Exports
	export let topTracks!: ITopTrack[];
</script>

{#each topTracks as topTrack, index (topTrack.songUrl)}
	<Track track="{topTrack}" />
{/each}
