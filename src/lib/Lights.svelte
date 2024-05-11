<script lang="ts">
	import Light from './light.svelte';

	export let pattern: string;
</script>

<div class="m-1 grid grid-cols-5 gap-[2px]">
	{#each pattern.split('') as tile}
		<Light on={tile === 'y'} />
	{/each}
</div>
