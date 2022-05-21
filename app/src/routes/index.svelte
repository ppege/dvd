<script context="module">
	export const prerender = true;
</script>

<svelte:head>
    <title>DVD player</title>
</svelte:head>

<script lang="ts">
    import Spin from "../components/Spin.svelte"
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
    import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp'
    import { fly } from 'svelte/transition'

    $: travelSpeed = 4
    $: spinSpeed = 2;
    let visible = false;
    $: emblemSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_Arms_of_Spain.svg/928px-Coat_of_Arms_of_Spain.svg.png";
    $: emblemSize = 320;
    $: bgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Simplified_Flag_of_Spain_%28civil_variant%29.svg/2560px-Simplified_Flag_of_Spain_%28civil_variant%29.svg.png";
</script>
<div class="flex">
    <div class="-z-50">
        <Spin bgSrc={bgSrc} emblemSrc={emblemSrc} emblemSize={emblemSize} spinSpeed={spinSpeed} speed={travelSpeed}/>
    </div>
    <div class="flex flex-col">
        {#if visible}
        <div transition:fly={{ y: -200, duration: 200 }}>
        <div class="bg-black/50 px-2 py-2 w-auto flex flex-row">
            <div class="flex flex-col">
                <div class="flex flex-col px-2 py-2 text-white">
                    <p>Travel Speed</p>
                    <div class="flex flex-row">
                        <input bind:value={travelSpeed} type=number class="font-mono bg-black/20 rounded w-12 text-center" min=0>
                        <input type=range bind:value={travelSpeed} min=0 max=25>
                    </div>
                </div>
                <div class="flex flex-col px-2 py-2 text-white">
                    <p>Spin Speed</p>
                    <div class="flex flex-row">
                        <input bind:value={spinSpeed} type=number class="font-mono bg-black/20 rounded w-12 text-center" min=0>
                        <input type=range bind:value={spinSpeed} min=0 max=25>
                    </div>
                </div>
                <div class="flex flex-col px-2 py-2 text-white">
                    <p>Emblem Size</p>
                    <div class="flex flex-row">
                        <input bind:value={emblemSize} type=number class="font-mono bg-black/25 rounded w-12 text-center" min=0>
                        <input type=range bind:value={emblemSize} min=128 max=1024>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="flex flex-col px-2 py-2 text-white items-center">
                    <p>Emblem Source</p>
                    <input class="font-mono bg-black/25 py-1 text-xs w-64 select-all" type=text bind:value={emblemSrc}>
                </div>
                <div class="flex flex-col px-2 py-2 text-white items-center">
                    <p>Background Source</p>
                    <input class="font-mono bg-black/25 py-1 text-xs w-64 select-all" type=text bind:value={bgSrc}>
                </div>
            </div>
        </div>
        <div class="w-10 h-10 py-1 px-2 bg-black/50 {visible?"opacity-100 hover:bg-black":"opacity-20"} hover:opacity-100" on:mouseover={() => {visible = false}}>
            <Fa icon={faAngleUp} size="2x" class="text-white"/>
        </div>
        </div>
        {/if}
        {#if !visible}
        <div class="w-10 h-10 py-1 px-2 bg-black/50 {visible?"opacity-100 hover:bg-black":"opacity-20"} hover:opacity-100 absolute" on:mouseover={() => {visible = true}}>
            <Fa icon={faAngleDown} size="2x" class="text-white"/>
        </div>
        {/if}
    </div>
</div>