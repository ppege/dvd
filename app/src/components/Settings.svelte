<script>
import Fa from 'svelte-fa/src/fa.svelte'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp'
import { fly } from 'svelte/transition'
import { travelSpeed, spinSpeed, emblemSrc, emblemSize, bgSrc, defaultEmblem, defaultBg } from '../components/stores'
import { browser } from '$app/env';
let visible = false;
</script>

<div class="flex flex-col">
    {#if visible}
    <div transition:fly={{ y: -200, duration: 200 }}>
    <div class="bg-black/25 lg:bg-black/50 lg:rounded-br-2xl px-2 py-2 flex flex-col lg:flex-row w-screen lg:w-auto items-center lg:items-start">
        <div class="flex flex-col">
            <div class="flex flex-col px-2 py-2 text-white">
                <p>Travel Speed</p>
                <div class="flex flex-row">
                    <input bind:value={$travelSpeed} type=number class="font-mono bg-black/20 rounded w-12 text-center" min=0>
                    <input type=range bind:value={$travelSpeed} min=0 max=25>
                </div>
            </div>
            <div class="flex flex-col px-2 py-2 text-white">
                <p>Spin Speed</p>
                <div class="flex flex-row">
                    <input bind:value={$spinSpeed} type=number class="font-mono bg-black/20 rounded w-12 text-center" min=0>
                    <input type=range bind:value={$spinSpeed} min=0 max=25>
                </div>
            </div>
            <div class="flex flex-col px-2 py-2 text-white">
                <p>Emblem Size</p>
                <div class="flex flex-row">
                    <input bind:value={$emblemSize} type=number class="font-mono bg-black/25 rounded w-12 text-center" min=0>
                    <input type=range bind:value={$emblemSize} min=128 max=1024>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-col px-2 py-2 text-white items-center">
                <p>Emblem URL</p>
                <input class="font-mono bg-black/25 py-1 text-xs w-64 select-all" type=text bind:value={$emblemSrc}>
            </div>
            <div class="flex flex-col px-2 py-2 text-white items-center">
                <p>Background URL</p>
                <input class="font-mono bg-black/25 py-1 text-xs w-64 select-all" type=text bind:value={$bgSrc}>
            </div>
            <div class="flex flex-row items-center px-2">
                <button class="bg-white/10 hover:bg-white/25 rounded-l border text-white w-32 px-2 py-1" on:click={()=>{
                    $emblemSrc = defaultEmblem;
                    $bgSrc = defaultBg;
                }}>
                    <p>Reset Images</p>
                </button>
                <button class="bg-white/10 hover:bg-white/25 rounded-r border text-white w-32 px-2 py-1" on:click={()=>{
                    $travelSpeed = 4;
                    $spinSpeed = 3;
                    $emblemSize = 320;
                }}>
                    <p>Reset Settings</p>
                </button>
            </div>
            <button class="bg-white/10 hover:bg-white/25 rounded-b border-b border-r border-l text-white w-32 px-2 py-1 self-center" on:click={()=>{
                $emblemSrc = defaultEmblem;
                $bgSrc = defaultBg;
                $travelSpeed = 4;
                $spinSpeed = 3;
                $emblemSize = 320;
            }}>
                <p>Reset All</p>
            </button>
        </div>
    </div>
    <button class="w-10 h-10 py-1 px-2 bg-black/50 {visible?"opacity-100 hover:bg-black":"opacity-20"} hover:opacity-100 rounded-br-2xl" on:click={()=>visible=false}>
        <Fa icon={faAngleUp} size="2x" class="text-white"/>
    </button>
    </div>
    {/if}
    {#if !visible && browser}
    <button class="w-10 h-10 py-1 px-2 z-50 bg-black/50 {visible?"opacity-100 hover:bg-black":"opacity-20"} hover:opacity-100 absolute rounded-br-2xl" on:mouseover={()=>visible=true} on:focus={()=>visible=true} on:click={()=>{visible=true}}>
        <Fa icon={faAngleDown} size="2x" class="text-white"/>
    </button>
    {/if}
</div>