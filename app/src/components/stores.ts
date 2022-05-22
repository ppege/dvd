import { writable } from 'svelte/store'
import { browser } from '$app/env';

const getItem = (item: string, fallback: string|number) => {
    try {
        return writable(localStorage.getItem(item) || fallback);
    } catch {
        return writable(fallback);
    }
}

export const defaultEmblem = browser?"/emblem.png":"https://color-hex.org/colors/ffffff.png";
export const defaultBg = browser?"/bg.png":"https://color-hex.org/colors/ffffff.png";

export const travelSpeed = getItem("travelSpeed", 4);
export const spinSpeed = getItem("spinSpeed", 2);
export const emblemSrc = getItem("emblemSrc", defaultEmblem);
export const emblemSize = getItem("emblemSize", 320);
export const bgSrc = getItem("bgSrc", defaultBg);

travelSpeed.subscribe(value => {
    if (browser) {
        localStorage.setItem('travelSpeed', value.toString())
    }
})
spinSpeed.subscribe(value => {
    if (browser) {
        localStorage.setItem('spinSpeed', value.toString())
    }
})
emblemSrc.subscribe(value => {
    if (browser) {
        localStorage.setItem('emblemSrc', value.toString())
    }
})
emblemSize.subscribe(value => {
    if (browser) {
        localStorage.setItem('emblemSize', value.toString())
    }
})
bgSrc.subscribe(value => {
    if (browser) {
        localStorage.setItem('bgSrc', value.toString())
    }
})