<script context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import Spin from '../components/Spin.svelte';
	import Settings from '../components/Settings.svelte';
	import {
		travelSpeed,
		spinSpeed,
		emblemSrc,
		emblemSize,
		bgSrc,
		selected,
		presets,
        fullscreenEnabled
	} from '../components/stores';
	import Notifications from 'svelte-notifications';
	import Fullscreen from 'svelte-fullscreen';

	const handleMessage = () => {
		if ($selected.includes('Randomize')) {
			$travelSpeed = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
			$spinSpeed = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
			$emblemSize = Math.floor(Math.random() * (512 - 128 + 1)) + 128;
		}
	};
</script>

<svelte:head>
	<title>{$presets.selected}</title>
</svelte:head>
<Fullscreen let:onRequest let:onExit>
	<Notifications>
		<div class="flex">
			<div class="-z-50">
				<Spin
					on:message={handleMessage}
					travelSpeed={$travelSpeed}
					spinSpeed={$spinSpeed}
					emblemSize={$emblemSize}
					emblemSrc={$emblemSrc}
					bgSrc={$bgSrc}
					selected={$selected}
				/>
			</div>
			<Settings
				on:message={() => {
					if (!$fullscreenEnabled) {
						onRequest();
					} else {
						onExit();
					}
					$fullscreenEnabled = !$fullscreenEnabled;
				}}
			/>
		</div>
	</Notifications>
</Fullscreen>
