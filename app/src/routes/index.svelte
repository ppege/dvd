<script context="module">
	export const prerender = true;
</script>

<svelte:head>
    <title>DVD player</title>
</svelte:head>

<script lang="ts">
    import Spin from "../components/Spin.svelte"
    import Settings from "../components/Settings.svelte"
    import { travelSpeed, spinSpeed, emblemSrc, emblemSize, bgSrc, invertMode } from '../components/stores'
    import Notifications from 'svelte-notifications'
</script>
<Notifications>
    <div class="flex">
        <div class="-z-50">
            <Spin bgSrc={$bgSrc} emblemSrc={$emblemSrc} emblemSize={$emblemSize} spinSpeed={$spinSpeed} speed={$travelSpeed} invertMode={$invertMode}/>
        </div>
        <Settings/>
    </div>
</Notifications>