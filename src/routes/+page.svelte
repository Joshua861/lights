<script lang="ts">
	import { board, state, moves, time, timerStarted } from '$lib/state';
	import { get } from 'svelte/store';
	import { reset } from '$lib';
	import { checkWin } from '$lib/board';
	import { fade, fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import History from '$lib/history.svelte';
	import Help from '$lib/Help.svelte';

	let hover = { x: -2, y: -2 };
	let hilightedTiles: Array<{ x: number; y: number }> = [];
	let timerInterval;

	$: hilightedTiles = [
		{ x: hover.x + 1, y: hover.y },
		{ x: hover.x - 1, y: hover.y },
		{ x: hover.x, y: hover.y + 1 },
		{ x: hover.x, y: hover.y - 1 },
		{ x: hover.x, y: hover.y }
	];

	function toggleTiles() {
		const boardSnap = get(board);
		hilightedTiles.forEach((tile) => {
			console.log(tile);
			if (boardSnap[tile.x]) {
				if (boardSnap[tile.x][tile.y] !== undefined) {
					const currentTile = boardSnap[tile.y][tile.x];
					console.log(currentTile);
					boardSnap[tile.y][tile.x] = !currentTile;
				}
			}
		});
		board.set(boardSnap);

		moves.set(get(moves) + 1);
		timerStarted.set(true);
		checkWin();
	}

	function incrementTimer() {
		if ($state === 'playing' && $timerStarted) {
			time.set(Math.round((get(time) + 0.1) * 10) / 10);
			console.log('slkdfjklsd');
		}
	}

	onMount(() => {
		timerInterval = setInterval(incrementTimer, 100);
	});

	onDestroy(() => {
		clearInterval(timerInterval);
	});
</script>

<div class="bg-surface fit mx-auto flex flex-col justify-center p-3 align-middle sm:p-10 md:p-20">
	<div class="flex flex-1 align-baseline">
		<div class="prose prose-invert mx-auto mb-10 mt-auto w-full">
			<h1 class="text-center">Lights Out</h1>
			<p class="text-center">
				Turn off all the lights. <button
					on:click={() => state.set('help')}
					class="!text-white underline underline-offset-4">Help.</button
				>
			</p>
		</div>
	</div>
	<div class="fit mx-auto my-auto grid aspect-square max-w-full grid-cols-5 gap-1">
		{#each $board as row, y}
			{#each row as piece, x}
				<button
					class="aspect-square w-full rounded border border-text/20 transition-all
    {hilightedTiles.find((tile) => tile.y === y && tile.x === x) !== undefined
						? 'bg-surface1/20'
						: ''}
    {piece ? '!bg-text' : ''}"
					on:mouseover={() => (hover = { x, y })}
					on:mouseout={() => (hover = { x: -2, y: -2 })}
					on:click={toggleTiles}
				>
				</button>
			{/each}
		{/each}
	</div>
	<div class="mt-5 flex w-full flex-1 flex-col justify-center">
		<p class="w-full text-center">{$moves} moves — {$time}s</p>
		<br />
		<button class="btn mx-auto mb-auto mt-5" on:click={reset}>Reset</button>
	</div>
</div>

{#if $state === 'won'}
	<div class="popup-container" transition:fade>
		<div class="popup" transition:fly={{ y: 100 }}>
			<h1 class="text-center">You win!</h1>

			<div class="mb-5 flex">
				<span>{$moves} moves</span><span class="flex-1 text-right">{$time}s</span>
			</div>

			<hr />
			<History />
			<hr />

			<button class="btn w-full" on:click={reset}>Reset</button>
		</div>
	</div>
{:else if $state === 'help'}
	<Help />
{/if}

<style>
	.fit {
		width: min(90vw, 90vh);
	}
</style>
