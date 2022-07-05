<script lang="ts">
    import { travelSpeed, spinSpeed, emblemSrc, emblemSize, bgSrc, defaultEmblem, defaultBg, selected, presets, previewMode } from '../components/stores'
    import axios from 'axios';
    import { getNotificationsContext } from 'svelte-notifications'
    import { page } from '$app/stores'
    import * as Storage from "ts-storage"
    const { addNotification } = getNotificationsContext();
    const notifyError = (args: any = {}) => {
        addNotification({
            text: args.message || 'An error occurred',
            position: args.position || 'top-right',
            type: args.type || 'danger',
            removeAfter: args.removeAfter || '20000'
        })
    }
    const notifySuccess = (args: any = {}) => {
        addNotification({
            text: args.message || 'Success!',
            position: args.position || 'top-right',
            type: args.type || 'success',
            removeAfter: args.removeAfter || '2000'
        })
    }
    let shareCode: string = "";
    const reFetchSettings = () => {
        $travelSpeed = Storage.get("travelSpeed", 3).value;
        $spinSpeed = Storage.get("spinSpeed", 0).value;
        $emblemSrc = Storage.get("emblemSrc", defaultEmblem).value;
        $emblemSize = Storage.get("emblemSize", 320).value;
        $bgSrc = Storage.get("bgSrc", defaultBg).value;
        $selected = Storage.get("onCollision", ['Invert']).value;
    }
    const generateShareCode = () => {
        shareCodeValid = false;
        axios.post(`https://api.nangurepo.com/v2/postData`, localStorage)
        .then((response: any) => {
            if (!response.data.error) {
                shareCode = response.data.code;
                shareCodeValid = true;
                notifySuccess({message: 'Share code generated!'});
            } else {
                notifyError({message: `Error: ${response.errors}`});
                if (response.errors[0] === 'Please provide valid JSON') {
                    notifyError({message: "Tip: your URLs may include some bad characters like quotes or semicolons.", type: 'warning'})
                }
            }
        })
        .catch(() => {
            notifyError("Error: couldn't generate share code");
        })
    }
    const loadShareCode = () => {
        axios.get(`https://api.nangurepo.com/v2/dvd?code=${shareCode}`)
        .then((response) => {
            $travelSpeed = response.data.travelSpeed || 4
            $spinSpeed = response.data.spinSpeed || 3
            $emblemSrc = response.data.emblemSrc || defaultEmblem
            $emblemSize = response.data.emblemSize || "320"
            $bgSrc = response.data.bgSrc || defaultBg
            $selected = response.data.onCollision || []
            if (!$previewMode) {
                notifySuccess({message: 'Share code loaded!'});
            }
        })
        .catch(() => {
            notifyError("Error: couldn't load share code");
        })
    }
    const previewShareCode = () => {
        $previewMode = true;
        loadShareCode();
        notifySuccess({message: `Now previewing share code ${shareCode}`});
    }
    const copyShareCode = () => {
        navigator.clipboard.writeText("https://dvd.nangurepo.com/#" + shareCode);
        notifySuccess({message: 'Link copied!'})
    }
    const exitPreviewMode = () => {
        window.history.pushState("", document.title, window.location.pathname);
        shareCodeValid = true;
        $previewMode = false;
        reFetchSettings();
        notifySuccess({message: 'Exited preview mode'});
    }
    let shareCodeValid = false;
	let timer: NodeJS.Timeout;
    const debounceValidity = () => {
        shareCodeValid = false;
        clearTimeout(timer);
        timer = setTimeout(() => {
            checkValidity()
            .then(() => {
                shareCodeValid = true;
            })
            .catch(() => {
                shareCodeValid = false;
            });
        }, 750);
    }
    const checkValidity = () => {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.nangurepo.com/v2/dvd?code=${shareCode}`)
            .then((response) => {
                if (response.data.error) {
                    reject();
                }
                resolve(true);
            })
            .catch(() => {
                reject();
            })
        })
    }
    const handlePresetChange = () => {
        const preset = $presets.presets[$presets.selected]
        $travelSpeed = preset.travelSpeed;
        $spinSpeed = preset.spinSpeed;
        $emblemSrc = preset.emblemSrc;
        $emblemSize = preset.emblemSize;
        $bgSrc = preset.bgSrc;
        $selected = preset.onCollision;
        notifySuccess({message: `Preset '${preset.name}' loaded`});
    }
    const savePreset = () => {
        let name = prompt('Name')
        if (!name) {return}
        if ($presets.options.includes(name) && !confirm("A preset with this name already exists. Overwrite?")) {
            return;
        }
        if (!$presets.options.includes(name)) {
            $presets.options = [...$presets.options, name]
        }
        $presets.selected = name
        $presets.presets[name] = {
            name: name,
            travelSpeed: $travelSpeed,
            spinSpeed: $spinSpeed,
            emblemSize: $emblemSize,
            selected: $selected,
            emblemSrc: $emblemSrc,
            bgSrc: $bgSrc,
            onCollision: $selected
        }
        $presets.presets = $presets.presets;
    }
    const deletePreset = () => {
        if (confirm(`Are you sure you want to delete '${$presets.selected}'?`)) {
            $presets.options = [...$presets.options].filter(i => i !== $presets.selected)
            delete $presets.presets[$presets.selected]
        }
    }
    if ($page.url.hash) {
        shareCode = $page.url.hash.substring(1);
        checkValidity()
        .then(() => {
            previewShareCode();
        })
        .catch(() => {
            notifyError({message: `Error: couldn't preview share code ${shareCode}`});
            window.history.pushState("", document.title, window.location.pathname);
        })
    }
    export let center: boolean = false;
</script>

{#if !$previewMode}
<div class={`flex flex-col w-auto ${center?"items-center justify-center":""}`}>
    <div class="flex flex-col px-2 py-2 text-white items-center">
        <p>Share Code</p>
        <input class="text-input w-full text-black" type=text bind:value={shareCode} on:keyup={debounceValidity}>
        <div class="flex flex-row w-full mt-1">
            <button class="bg-white/10 hover:bg-white/25 rounded-tl border text-white px-2 py-1 w-2/3" on:click={generateShareCode}>
                <p>Generate</p>
            </button>
            <button class="bg-white/10 hover:bg-white/25 rounded-tr border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-2/3" on:click={copyShareCode} disabled={!shareCodeValid}>
                <p>Copy link</p>
            </button>
        </div>
        <div class="flex flex-row w-full">
            <button class="bg-white/10 hover:bg-white/25 rounded-bl border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-2/3" on:click={previewShareCode} disabled={!shareCodeValid}>
                <p>Preview</p>
            </button>
            <button class="bg-white/10 hover:bg-white/25 rounded-br border text-white px-2 py-1 disabled:bg-black/5 disabled:border-slate-700 disabled:text-slate-300 w-1/3" on:click={loadShareCode} disabled={!shareCodeValid}>
                <p>Load</p>
            </button>
        </div>
    </div>
    <div class="flex flex-col px-2 py-2 items-center">
        <p class="text-white">Presets</p>
        <select class="text-input font-sans w-full" bind:value={$presets.selected} on:change={handlePresetChange}>
            {#each $presets.options as preset}
                <option value={preset}>{preset}</option>
            {/each}
        </select>
        <div class="flex flex-row w-auto">
            <button class="bg-white/10 hover:bg-white/25 border text-white px-2 py-1" on:click={savePreset}>Save Preset</button>
            <button class="bg-white/10 hover:bg-white/25 border text-white px-2 py-1" on:click={deletePreset}>Delete Preset</button>
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