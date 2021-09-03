<script lang="ts">
	import ExternalLink from '$ui/components/external-link/ExternalLink.svelte';
</script>

<footer class="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
	<hr class="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
	<slot/>
	<div class="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
		<div class="flex flex-col space-y-4">
			<a sveltekit:prefetch href="/" class="text-gray-500 hover:text-gray-600 transition">Home</a>
			<a sveltekit:prefetch href="/about" class="text-gray-500 hover:text-gray-600 transition"> About </a>
			<a sveltekit:prefetch href="/settings" class="text-gray-500 hover:text-gray-600 transition">
				Newsletter
			</a>
		</div>
		<div class="flex flex-col space-y-4">
			<ExternalLink href="https://www.linkedin.com/in/asnavneetsharma/">LinkedIn</ExternalLink>
			<ExternalLink href="https://github.com/navneetsharmaui">GitHub</ExternalLink>
			<ExternalLink href="https://twitter.com/asnavneetsharma">Twitter</ExternalLink>
			<ExternalLink href="https://www.instagram.com/asnavneetsharma/">Instagram</ExternalLink>
		</div>
		<div class="flex flex-col space-y-4">
			<a sveltekit:prefetch href="/blog/categories" class="text-gray-500 hover:text-gray-600 transition">Categories</a>
			<a sveltekit:prefetch href="/settings" class="text-gray-500 hover:text-gray-600 transition"> Snippets </a>
			<a sveltekit:prefetch href="/settings" class="text-gray-500 hover:text-gray-600 transition"> Tweets </a>
		</div>
	</div>
</footer>
