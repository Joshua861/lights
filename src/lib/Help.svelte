<script>
	import Lights from './Lights.svelte';
	import Clicks from './Clicks.svelte';
	import { state } from './state';
	import { fade, fly } from 'svelte/transition';

	const data = [
		['nnyyy', 'nnnyn'],
		['nynyn', 'nynny'],
		['nyyny', 'ynnnn'],
		['ynnny', 'nnnyy'],
		['ynyyn', 'nnnny'],
		['yynyy', 'nnynn'],
		['yyynn', 'nynnn']
	];
</script>

<div class="popup-container" transition:fade>
	<div class="popup" transition:fly={{ y: 100 }}>
		<h1>How to play.</h1>

		<ol>
			<li>
				Going down the grid, for every row, click the square under every lit piece. Repeat this for
				each row until you only have lights lit up on the bottom row.
			</li>
			<li>
				This will leave you with one of a few patterns left. You can use this table to decide what
				moves to make next.

				<table class="flex flex-col">
					<thead>
						<tr class="flex">
							<th class="w-1/2" scope="col">Lights on bottom row.</th><th class="w-1/2" scope="col">
								Where to click on the top row
							</th>
						</tr>
					</thead>
					<tbody>
						{#each data as row}
							<tr class="flex">
								<td class="w-1/2">
									<Lights pattern={row[0]} />
								</td>
								<td class="w-1/2">
									<Clicks pattern={row[1]} />
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</li>

			<li>
				Repeat step one once more. If you did everything right, you should be left with an empty
				board.
			</li>
		</ol>

		<br />
		<button class="btn w-full" on:click={() => state.set('playing')}>Ok. Thanks!</button>
	</div>
</div>
