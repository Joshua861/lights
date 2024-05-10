<script lang="ts">
	import { get } from 'svelte/store';
	import { board } from '$lib/state';
	import { reset } from '$lib';
	import '../app.pcss';
	import { onMount } from 'svelte';

	onMount(() => {
		if (get(board).length === 0) {
			reset();
		}
	});
</script>

<slot></slot>
