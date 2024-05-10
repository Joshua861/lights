<script lang="ts">
	import { board, state } from '$lib/state';
	import { get } from 'svelte/store';
	import { reset } from '$lib';
	import { checkWin } from '$lib/board';
	import { fade, fly } from 'svelte/transition';

	let hover = { x: -2, y: -2 };
	let hilightedTiles: Array<{ x: number; y: number }> = [];

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

		checkWin();
	}
</script>

<div class="bg-surface flex h-[100vh] w-[100vw] flex-col justify-center align-middle">
	<div class="flex flex-1 align-baseline">
		<div class="prose prose-invert mx-auto mb-10 mt-auto w-full">
			<h1 class="text-center">Lights Out</h1>
			<p class="text-center">
				Turn off all the lights. <a href="https://www.logicgamesonline.com/lightsout/tutorial.html"
					>Help</a
				>
			</p>
		</div>
	</div>
	<div class="fit mx-auto my-auto grid aspect-square max-w-full grid-cols-5 gap-1">
		{#each $board as row, y}
			{#each row as piece, x}
				<button
					class="aspect-square w-full rounded border border-surface1/50 transition-all
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
	<div class="flex w-full flex-1 justify-center">
		<button class="btn mx-auto mb-auto mt-5" on:click={reset}>Reset</button>
	</div>
</div>

{#if $state === 'won'}
	<div class="popup-container" transition:fade>
		<div class="popup" transition:fly={{ y: 100 }}>
			<h1 class="text-center">You win!</h1>

			<button class="btn w-full" on:click={reset}>Reset</button>
		</div>
	</div>
{/if}

<style>
	.fit {
		width: min(90vw, 90vh);
	}
</style>
