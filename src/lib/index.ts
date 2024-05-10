import { newBoard } from './board';
import { board, state } from './state';

export function reset() {
	board.set(newBoard());
	state.set('playing');
}
