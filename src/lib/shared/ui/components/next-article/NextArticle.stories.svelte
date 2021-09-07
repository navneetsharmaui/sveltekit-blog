<script lang="ts">
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import NextArticle from './NextArticle.svelte';
</script>

<Meta title="UI/NextArticle" component="{NextArticle}" />

<!--  -->

<Template let:args>
	<NextArticle {...args} />
</Template>

<Story name="Primary" />
