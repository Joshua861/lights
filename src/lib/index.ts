import { newBoard } from './board';
import { board, state, time, moves, timerStarted } from './state';

export function reset() {
	board.set(newBoard());
	state.set('playing');
	time.set(0);
	moves.set(0);
	timerStarted.set(false);
}
