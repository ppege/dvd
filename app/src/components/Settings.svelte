<script lang="ts">
    import { browser, mode } from '$app/env';
    import axios from 'axios';
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
    import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp'
    import { fly } from 'svelte/transition'
    import { travelSpeed, spinSpeed, emblemSrc, emblemSize, bgSrc, defaultEmblem, defaultBg, invertMode, previewMode } from '../components/stores'
    import { page } from '$app/stores'
    const getItem = (item: string, fallback: string|number) => {
        try {
            return localStorage.getItem(item) || fallback;
        } catch {
            return fallback;
        }
    }
    const getBool = (item: string, fallback: boolean) => {
        try {
            return (localStorage.getItem(item) === 'true') || fallback;
        } catch {
            return fallback;
        }
    }
    let visible = false;
    let shareCode: string = "";
    const generateShareCode = () => {
        axios.get(`https://api.nangurepo.com/v2/dvd?data=${JSON.stringify(localStorage)}`)
        .then((response) => {
            shareCode = response.data
        })
        .catch(() => {
            shareCode = "Error!"
        })
        checkValidity();
    }
    const loadShareCode = () => {
        axios.get(`https://api.nangurepo.com/v2/dvd?code=${shareCode}`)
        .then((response) => {
            if ("errors" in response.data) {
                throw(response.data.errors[0])
            }
            $travelSpeed = response.data.travelSpeed || 4
            $spinSpeed = response.data.spinSpeed || 3
            $emblemSrc = response.data.emblemSrc || defaultEmblem
            $emblemSize = response.data.emblemSize || "320"
            $bgSrc = response.data.bgSrc || defaultBg
            $invertMode = response.data.invertMode || false
        })
        .catch(() => {
            shareCode = "Error!"
        })
    }
    const previewShareCode = () => {
        $previewMode = true;
        loadShareCode();
    }
    let copyText = "Copy link";
    const copyShareCode = () => {
        navigator.clipboard.writeText("https://dvd.nangurepo.com/#" + shareCode);
        copyText = "Copied!"
        setTimeout(() => {
            copyText = "Copy link"
        }, 2000)
    }
    const exitPreviewMode = () => {
        window.history.pushState("", document.title, window.location.pathname);
        $previewMode = false;
        $travelSpeed = getItem("travelSpeed", 4);
        $spinSpeed = getItem("spinSpeed", 2);
        $emblemSrc = getItem("emblemSrc", defaultEmblem);
        $emblemSize = getItem("emblemSize", 320);
        $bgSrc = getItem("bgSrc", defaultBg);
        $invertMode = getBool("invertMode", false);
    }
    if ($page.url.hash) {
        $previewMode = true;
        shareCode = $page.url.hash.substring(1);
        loadShareCode();
    }
    let shareCodeValid = false;
	let timer: any;
    const checkValidity = () => {
        shareCodeValid = false;
        clearTimeout(timer);
        timer = setTimeout(() => {
            axios.get(`https://api.nangurepo.com/v2/dvd?code=${shareCode}`)
            .then((response) => {
                if ("errors" in response.data) {
                    shareCodeValid = false;
                    return;
                }
                shareCodeValid = true;
            })
            .catch(() => {
                shareCodeValid = false;
            })
		}, 750);
    }
</script>

<div class="flex flex-col">
    {#if visible}
    <div transition:fly={{ y: -200, duration: 200 }}>
    <div class="bg-black/25 md:bg-black/50 md:rounded-br-2xl px-2 py-2 flex flex-col md:flex-row w-screen md:w-auto items-center md:items-start">
        {#if !$previewMode}
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
            <div class="flex flex-row px-2 py-2 text-white items-center">
                <input type=checkbox bind:checked={$invertMode} class="mr-2">
                <p>Invert Mode</p>
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
                    $invertMode = false;
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
                $invertMode = false;
            }}>
                <p>Reset All</p>
            </button>
        </div>
        <div class="flex flex-col">
            <div class="flex flex-col px-2 py-2 text-white items-center">
                <p>Share Code</p>
                <input class="font-mono bg-black/25 py-1 w-full" type=text bind:value={shareCode} on:keyup={checkValidity} on:change={checkValidity}>
                <div class="flex flex-row w-full">
                    <button class="bg-white/10 hover:bg-white/25 rounded border text-white px-2 py-1 w-2/3" on:click={generateShareCode}>
                        <p>Generate</p>
                    </button>
                    <button class="bg-white/10 hover:bg-white/25 rounded border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-2/3" on:click={copyShareCode} disabled={!shareCodeValid}>
                        <p>{copyText}</p>
                    </button>
                </div>
                <div class="flex flex-row w-full">
                    <button class="bg-white/10 hover:bg-white/25 rounded border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-2/3" on:click={previewShareCode} disabled={!shareCodeValid}>
                        <p>Preview</p>
                    </button>
                    <button class="bg-white/10 hover:bg-white/25 rounded border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-1/3" on:click={loadShareCode} disabled={!shareCodeValid}>
                        <p>Load</p>
                    </button>
                </div>
            </div>
        </div>
        {:else}
        <div class="flex flex-col text-white">
            <p>You are currently previewing share code {shareCode}.</p>
            <button class="bg-white/10 hover:bg-white/25 rounded border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-full" on:click={exitPreviewMode}>
                <p>Exit preview mode</p>
            </button>
        </div>
        {/if}
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