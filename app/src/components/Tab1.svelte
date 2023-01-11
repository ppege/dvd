<script lang="ts">
	import {
		travelSpeed,
		spinSpeed,
		emblemSrc,
		emblemSize,
		bgSrc,
		defaultEmblem,
		defaultBg,
		selected,
        fullscreenEnabled
	} from '../components/stores';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let choices = ['Flip', 'Invert', 'Randomize'];
	export let center: boolean = false;
</script>

<div class={`flex flex-col ${center ? 'items-center justify-center' : ''}`}>
	<div class="flex flex-col px-2 py-2">
		<p class="text-white">Travel Speed</p>
		<div class="flex flex-row">
			<input bind:value={$travelSpeed} type="number" class="number-input" min="0" />
			<input type="range" bind:value={$travelSpeed} min="0" max="25" />
		</div>
	</div>
	<div class="flex flex-col px-2 py-2">
		<p class="text-white">Spin Speed</p>
		<div class="flex flex-row">
			<input bind:value={$spinSpeed} type="number" class="number-input" min="0" />
			<input type="range" bind:value={$spinSpeed} min="0" max="25" />
		</div>
	</div>
	<div class="flex flex-col px-2 py-2">
		<p class="text-white">Emblem Size</p>
		<div class="flex flex-row">
			<input bind:value={$emblemSize} type="number" class="number-input" min="0" />
			<input type="range" bind:value={$emblemSize} min="128" max="1024" />
		</div>
	</div>
	<button
		class="bg-white/10 hover:bg-white/25 border text-white px-2 py-1"
		on:click={() => {
			dispatch('message');
		}}>{$fullscreenEnabled?"Exit":"Enter"} fullscreen</button
	>
</div>
<div class="flex flex-col">
	<div class="flex flex-col px-2 py-2 items-center">
		<p class="text-white">Emblem URL</p>
		<input class="text-input text-xs w-64" type="text" bind:value={$emblemSrc} />
	</div>
	<div class="flex flex-col px-2 py-2 items-center">
		<p class="text-white">Background URL</p>
		<input class="text-input text-xs w-64" type="text" bind:value={$bgSrc} />
	</div>
	<div class="flex flex-col text-white items-center">
		<p>On collision</p>
		<div class="flex flex-row w-full">
			{#each choices as item}
				{#if !$selected.includes(item)}
					<button
						class="bg-white/10 hover:bg-white/25 border text-white w-full px-2 py-1"
						on:click={() => {
							$selected = [...$selected, item];
						}}>{item}</button
					>
				{:else}
					<button
						class="bg-white/90 hover:bg-white border border-slate-200 text-black w-full px-2 py-1"
						on:click={() => {
							$selected = [...$selected].filter((i) => i !== item);
						}}>{item}</button
					>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex flex-row items-center px-2 mt-1">
		<button
			class="bg-white/10 hover:bg-white/25 rounded-l border text-white w-32 px-2 py-1"
			on:click={() => {
				$emblemSrc = defaultEmblem;
				$bgSrc = defaultBg;
			}}
		>
			<p>Reset Images</p>
		</button>
		<button
			class="bg-white/10 hover:bg-white/25 rounded-r border text-white w-32 px-2 py-1"
			on:click={() => {
				$travelSpeed = 2;
				$spinSpeed = 0;
				$emblemSize = 320;
				$selected = ['Invert'];
			}}
		>
			<p>Reset Settings</p>
		</button>
	</div>
	<button
		class="bg-white/10 hover:bg-white/25 rounded-b border-b border-r border-l text-white w-32 px-2 py-1 self-center"
		on:click={() => {
			$emblemSrc = defaultEmblem;
			$bgSrc = defaultBg;
			$travelSpeed = 2;
			$spinSpeed = 0;
			$emblemSize = 320;
			$selected = ['Invert'];
		}}
	>
		<p>Reset All</p>
	</button>
</div>
