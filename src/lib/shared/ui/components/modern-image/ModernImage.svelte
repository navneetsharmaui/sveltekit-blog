<script lang="ts">
	import type { IModernImage } from '$models/interfaces/imodern-image.interface';

	export let modernImages!: IModernImage[];

	$: modernJPEG = modernImages.find((x) => x.isJPEG);
</script>

<picture>
	{#each modernImages as modernImage, index (modernImage.imageUrl)}
		<source
			srcset="{modernImage.imageUrl}"
			type="{modernImage.imageType}"
			width="{modernImage.imageWidth}"
			height="{modernImage.imageHeight}"
		/>
	{/each}
	<img
		class="{modernJPEG.css}"
		alt="{modernJPEG.imageAlt}"
		loading="eager"
		decoding="async"
		width="{modernJPEG.imageWidth}"
		height="{modernJPEG.imageHeight}"
		src="{modernJPEG.imageUrl}"
	/>
</picture>
