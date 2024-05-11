import type { Writable } from 'svelte/store';
import type { Board } from './board';
import { persisted } from 'svelte-persisted-store';

export const board: Writable<Board> = persisted('board', []);
export const state: Writable<'playing' | 'won' | 'help'> = persisted('state', 'playing');
export const time: Writable<number> = persisted('time', 0);
export const moves: Writable<number> = persisted('moves', 0);
export const timerStarted: Writable<boolean> = persisted('timer_started', false);
export const history: Writable<Array<{ date: number; time: number; moves: number }>> = persisted(
	'history',
	[]
);
