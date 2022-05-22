<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from '$app/env';

    export let speed: any;
    export let spinSpeed: any;
    export let emblemSize: any;
    export let emblemSrc: any;
    export let bgSrc: any;

    let y = 1
    let x = 1

    let padding = 0

    let directionY = true
    let directionX = true

    let boundX = 0
    let boundY = 0

    let offsetHeight;
    let offsetWidth;

    let renderBox: any;
    let dvd: any;

    onMount(() => {
        //Setting up render event
        setInterval(() => {
            render()
        }, (10));
    })

    function render(){
        //Setting up bounds for collision.
        boundX = renderBox.offsetWidth - dvd.offsetWidth - padding
        boundY = renderBox.offsetHeight - dvd.offsetHeight - padding

        //Colliding on Y axis.
        if(y >= boundY && directionY){
            onCollide("Y")
        }
        else if(y < padding && !directionY){
            onCollide("Y")
        }

        //Colliding on X axis.
        if(x >= boundX && directionX){
            onCollide("X")
        }
        else if(x < padding && !directionX){
            onCollide("X")
        }

        //Setting up the speed and direction of X axis
        if(directionX){
            x = x + 1 * speed 
        }else{
            x = x + 1 * speed * (-1)
        }

        //Setting up the speed and direction of Y axis
        if(directionY){
            y = y + 1 * speed
        }else{
            y = y + 1 * speed * (-1)
        }

        //Setting up logo position on the axis
        dvd.style.left = `${x}px`
        dvd.style.top = `${y}px`
    }

    //Change direction whenever the box collide
    function onCollide(axis: string){
        switch(axis){
            case "Y":
                directionY = !directionY
                break;
            case "X":
                directionX = !directionX
                break;
        }
    }
    const getSpinSpeed = (speed: number, size: number) => {
        let s = speed == 0 ? "0":((1/speed)*10)
        return `animation: spin ${s}s linear infinite; width: ${size}px;`
    }
    $: spinStyle = getSpinSpeed(spinSpeed, emblemSize)
    const getWatermark = () => {
        const verbs = [
            "made",
            "built",
            "created",
            "designed",
            "crafted",
            "developed",
            "produced",
            "forged",
            "brought into existence"
        ]
        const prepositions = [
            "using",
            "with",
            "at"
        ]
        const emojis = [
            "💎",
            "💯",
            "🐐"
        ]
        const prefix = verbs[Math.floor(Math.random()*verbs.length)] + " " + prepositions[Math.floor(Math.random()*prepositions.length)];
        return prefix + " dvd.nangurepo.com " + emojis[Math.floor(Math.random()*emojis.length)]
    }
</script>

    <div id="renderBox" bind:offsetHeight bind:offsetWidth style="background-image: url({bgSrc})" bind:this={renderBox}>
        <div id="dvd" bind:offsetHeight bind:offsetWidth bind:this={dvd}>
            <img style={spinStyle} src={emblemSrc} alt="emblem">
        </div>
        {#if browser}
        <p class="watermark text-white self-center text-xl md:text-2xl opacity-80 mr-2 mb-2 bg-black/25 px-2 rounded">{getWatermark()}</p>
        {/if}
        <div class="animate-spin"/>
    </div>

<style>
    #renderBox{
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        margin-bottom: 0;
        position: absolute;
        z-index: 1;
    }
    .watermark{
        position: fixed;
        bottom: 0;
        right: 0;        
        user-select: none; /* Non-prefixed version for chorme, opera and*/
        -ms-user-select: none; /* Internet Explorer, Edge */
        -moz-user-select: none; /* Firefox */
        -khtml-user-select: none; /* Konqueror HTML */
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
    }
    #dvd{
        position: absolute;
        top: 0;
        left: 0;
    }
</style>