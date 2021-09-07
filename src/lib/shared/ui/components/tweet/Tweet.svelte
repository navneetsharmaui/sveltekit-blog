<script lang="ts">
	import type { ITweet } from '$models/interfaces/itweet.interface';

	export let tweet!: ITweet;

	const createdAt = new Date(tweet.created_at);

	const formatedText = tweet.text.replace(/https:\/\/[\n\S]+/g, '');
</script>
