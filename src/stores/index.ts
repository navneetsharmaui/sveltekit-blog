import { writable } from 'svelte/store';

import type { INowPlayingTrack } from '$models/interfaces/inow-playing-track.interface';

export const isDev = writable(process.env.NODE_ENV === 'development');

export const nowPlayingSong = writable<INowPlayingTrack>({ isPlaying: false });
