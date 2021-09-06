<script lang="ts">
	// Start: Local Imports

	import { onDestroy, onMount } from 'svelte';
	import { nowPlayingSong } from '$stores';
	// Start: External Imports
	import '../styles/tailwind.postcss';

	// End: External Imports

	// Core services

	// Components
	import Header from '$ui/components/header/Header.svelte';
	import Footer from '$ui/components/footer/Footer.svelte';
	import NowPlaying from '$components/now-playing/NowPlaying.svelte';
	import CompiledStyles from '$components/compiled-styles/CompiledStyles.svelte';

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
	import type { ICompiledCSS } from '$lib/models/interfaces/icompiled-css.interface';
	// End: Local Imports

	// Start: Local component properties
	/**
	 * @type {IHeaderNavLink}
	 */
	const navLinks: IHeaderNavLink[] = [
		{
			path: '/',
			label: 'Home',
		},
		{
			path: '/about',
			label: 'About',
		},
		{
			path: '/projects',
			label: 'Projects',
		},
		{
			path: '/blog',
			label: 'Blog',
		},
	];

	const stylesList: ICompiledCSS[] = [
		{
			url: '/tailwind.css',
		},
	];
	// End: Local component properties

	let dark = true;

	// Start: Local component methods

	const toggleThemeMode = (event: CustomEvent<{ dark: boolean }>): void => {
		const htmlTag = document.getElementsByTagName('html').item(0);
		htmlTag.className = event.detail.dark ? 'dark' : 'light';
	};

	let clearSetTimeout: NodeJS.Timeout;
	const getCurrentlyPlayingSong = (): void => {
		fetch(`/api/now-playing.json`)
			.then((res) => res.json())
			.then((response) => nowPlayingSong.set(response));

		clearSetTimeout = setTimeout(getCurrentlyPlayingSong, 120000);
	};
	onMount(async () => {
		getCurrentlyPlayingSong();
	});

	onDestroy(() => {
		clearTimeout(clearSetTimeout);
	});

	// End: Local component methods
</script>

<CompiledStyles cssFiles="{stylesList}" />

<div class="bg-white dark:bg-black">
	<!-- Start: Header Navigation -->
	<Header
		on:toggleTheme="{(e) => toggleThemeMode(e)}"
		navLinks="{navLinks}"
		logoImage="{'/images/author/navneet-sharma.jpg'}"
		title="{'Navneet Sharma'}"
		useThemeModeButton="{true}"
		useTitleAndLogo="{true}"
	/>
	<!-- End: Header Navigation -->
	<main id="skip" class="flex flex-col justify-center px-8 bg-white dark:bg-black">
		<!-- Start: Defaull layout slot -->
		<slot />
		<!-- End: Defaull layout slot -->
		<!-- Start: Footer -->
		<Footer>
			<NowPlaying />
		</Footer>
		<!-- End: Footer -->
	</main>
</div>
