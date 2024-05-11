<script lang="ts">
	import Click from './Click.svelte';

	export let pattern: string;
</script>

<div class="m-1 grid grid-cols-5 gap-[2px]">
	{#each pattern.split('') as tile}
		<Click on={tile === 'y'} />
	{/each}
</div>
