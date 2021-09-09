import { writable } from 'svelte/store';

import type { INowPlayingTrack } from '$models/interfaces/inow-playing-track.interface';

export const nowPlayingSong = writable<INowPlayingTrack>({ isPlaying: false });
