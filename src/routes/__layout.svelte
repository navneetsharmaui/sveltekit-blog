<script lang="ts">
	// Start: Local Imports

	// Start: External Imports
	// End: External Imports

	// Core services
	import { sveltekitStarterEnvironmentFacade } from '$core/services/environment/environment.facade';

	// Components
	import Header from '$ui/components/header/Header.svelte';

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
	];

	const applicationHeaderTitle = `${sveltekitStarterEnvironmentFacade.environmentName} | Sveltekit`;
	// End: Local component properties
</script>

<!-- Start: Header Navigation -->
<Header title="{applicationHeaderTitle}" navLinks="{navLinks}" />
<!-- End: Header Navigation -->

<!-- Start: Defaull layout slot -->
<slot />
<!-- End: Defaull layout slot -->
