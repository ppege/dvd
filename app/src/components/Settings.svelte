<script lang="ts">
    import { browser } from '$app/env';
    import Fa from 'svelte-fa/src/fa.svelte'
    import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
    import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp'
    import { fly } from 'svelte/transition'
    import { previewMode } from '../components/stores'
    import Tab1 from './Tab1.svelte'
    import Tab2 from './Tab2.svelte'
    import MediaQuery from './MediaQuery.svelte'
    import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@rgossiaux/svelte-headlessui";

    let visible = true;
</script>

<div class="flex flex-col">
    {#if visible}
    <div transition:fly={{ y: -200, duration: 200 }}>
    <div class="bg-black/25 md:bg-slate-800/60 md:rounded-br-2xl px-2 py-2 flex flex-col md:flex-row w-screen md:w-auto items-center md:items-start">
        {#if !$previewMode}
        <MediaQuery query="(min-width: 768px)" let:matches>
            {#if matches}
            <Tab1/>
            <Tab2/>
            {:else}
            <TabGroup class="justify-center items-center content-center">
                <TabList class="px-1 py-1 bg-white/75 rounded w-fit m-auto">
                    <Tab class="px-1 bg-slate-700 text-white rounded text-lg">Settings</Tab>
                    <Tab class="px-1 bg-slate-700 text-white rounded text-lg">Miscellaneous</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Tab1 center/>
                    </TabPanel>
                    <TabPanel>
                        <Tab2 center/>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
            {/if}
        </MediaQuery>
        {:else}
        <Tab2/>
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