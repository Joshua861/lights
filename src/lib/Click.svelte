<script lang="ts">
	import { X } from 'lucide-svelte';

	export let on: boolean = false;
</script>

<div
	class="flex aspect-square w-full justify-center rounded border border-text/20 align-middle transition-all"
>
	{#if on}
		<X class="my-auto h-max w-max sm:p-2" />
	{/if}
</div>
