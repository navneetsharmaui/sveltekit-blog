<script lang="ts">
	// Start: Local Imports

	// Start: External Imports
	// End: External Imports

	// Core services
	import { sveltekitStarterEnvironmentFacade } from '$core/services/environment/environment.facade';

	// Components
	import Header from '$ui/components/header/Header.svelte';
	import Footer from '$ui/components/footer/Footer.svelte';
	import NowPlaying from '$shared/components/now-playing/NowPlaying.svelte';

	// Models
	import type { IHeaderNavLink } from '$models/interfaces/iheader-nav-link.interface';
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
			path: '/settings',
			label: 'Settings',
		},
		{
			path: '/users',
			label: 'Users',
		},
		{
			path: '/blog',
			label: 'Blog',
		},
	];

	const applicationHeaderTitle = `${sveltekitStarterEnvironmentFacade.environmentName} | Sveltekit`;
	// End: Local component properties
</script>

<div class="bg-white dark:bg-black">
	<!-- Start: Header Navigation -->
	<Header navLinks="{navLinks}" />
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
