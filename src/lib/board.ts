import { get } from 'svelte/store';
import { board, history, moves, state, time } from './state';
import { randomInt } from './utils';

export type Board = Array<Array<boolean>>;

export function newBoard() {
	const board = [];
	const size = 5;

	for (let x = 0; x < size; x++) {
		const row = [];

		for (let y = 0; y < size; y++) {
			row.push(false);
		}

		board.push(row);
	}

	for (let i = 0; i < 20; i++) {
		const x = randomInt(4);
		const y = randomInt(4);
		console.log({ x, y });

		const tiles = getAdjacent({ x, y });

		for (const tile of tiles) {
			board[tile.x][tile.y] = !board[tile.x][tile.y];
		}
	}

	return board;
}

export function getAdjacent({ x, y }) {
	const tiles = [];

	if (x < 4) {
		tiles.push({ x: x + 1, y });
	}
	if (x > 0) {
		tiles.push({ x: x - 1, y });
	}
	if (y < 4) {
		tiles.push({ x, y: y + 1 });
	}
	if (y > 0) {
		tiles.push({ x, y: y - 1 });
	}
	tiles.push({ x, y });

	return tiles;
}

export function checkWin() {
	const boardSnap = get(board);
	let lightCount = 0;

	for (const row of boardSnap) {
		for (const piece of row) {
			lightCount += piece ? 1 : 0;
		}
	}

	if (lightCount === 0) {
		state.set('won');

		history.update((history) => {
			return [
				...history,
				{
					date: Date.now(),
					time: get(time),
					moves: get(moves)
				}
			];
		});
	}
}
