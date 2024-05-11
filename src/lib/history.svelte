<script lang="ts">
	import { history as historyStore } from './state';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		Title,
		CategoryScale
	} from 'chart.js';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

	let canvas;
	let history;
	const colors = {
		mantle: '#181825',
		base: '#1e1e2e',
		blue: '#89b4fa',
		red: '#f38ba8',
		subtext: '#a6adc8'
	};

	historyStore.subscribe((data) => {
		history = data;
		console.log(history);
	});

	onMount(() => {
		new Chart(canvas, {
			type: 'line',
			data: {
				labels: history.map((row) => format(new Date(row.date), 'yy-mm-dd')),
				datasets: [
					{
						label: 'Moves',
						data: history.map((row) => row.moves),
						borderColor: colors.blue,
						backgroundColor: colors.base,
						lineTension: 0.4
					},
					{
						label: 'Time',
						data: history.map((row) => row.time),
						borderColor: colors.red,
						backgroundColor: colors.base,
						lineTension: 0.4
					}
				]
			},
			options: {
				scales: {
					x: {
						ticks: {
							color: colors.subtext
						}
					},
					y: {
						ticks: {
							color: colors.subtext
						}
					}
				},
				plugins: {
					legend: {
						labels: {
							color: colors.subtext,
							font: {
								family: "'JetBrains Mono', 'monospace'"
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas bind:this={canvas}></canvas>
