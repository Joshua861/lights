<script lang="ts">
	export let on: boolean = false;
</script>

<div
	class="aspect-square w-full rounded border border-text/20 transition-all"
	class:bg-text={on}
></div>
