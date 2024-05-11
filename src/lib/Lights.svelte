<script lang="ts">
	import Light from './light.svelte';

	export let pattern: string;
</script>

<div class="grid grid-cols-5 gap-[1px] sm:gap-[2px]">
	{#each pattern.split('') as tile}
		<Light on={tile === 'y'} />
	{/each}
</div>
