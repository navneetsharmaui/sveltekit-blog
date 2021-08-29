<style lang="scss" type="text/scss">
</style>

<script lang="ts">
	// Start: Local Imports

	// Models
	import type { IHeaderNavLink } from '$lib/models/interfaces/iheader-nav-link.interface';
	// End: Local Imports

	// Start: Exported Properties
	/**
	 * @type {string}
	 */
	export const title = '';

	/**
	 * @type {IHeaderNavLink}
	 */
	export let navLinks: IHeaderNavLink[] = [];
	// End: Exported Properties
</script>

<nav
	class="flex items-center justify-between w-full max-w-4xl p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black bg-opacity-60 dark:text-gray-100"
>
	<a href="#skip" class="skip-nav"> Skip to content </a>
	<button aria-label="Toggle Dark Mode" type="button" class="w-10 h-10 p-3 bg-gray-200 rounded dark:bg-gray-800">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			stroke="currentColor"
			class="w-4 h-4 text-gray-800 dark:text-gray-200"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="{2}"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
		</svg>
	</button>
	<div>
		{#each navLinks as navLink (navLink.path)}
			<a sveltekit:prefetch href="{navLink.path}" class="p-1 text-gray-900 sm:p-4 dark:text-gray-100"> {navLink.label} </a>
		{/each}

	</div>
</nav>
