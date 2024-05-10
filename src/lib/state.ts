import type { Writable } from 'svelte/store';
import type { Board } from './board';
import { persisted } from 'svelte-persisted-store';

export const board: Writable<Board> = persisted('board', []);
export const state: Writable<'playing' | 'won'> = persisted('state', 'playing');
