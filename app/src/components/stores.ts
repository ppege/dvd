import { writable } from 'svelte/store'
import { browser } from '$app/env';

const getItem = (item: string, fallback: string|number) => {
    try {
        return writable(localStorage.getItem(item) || fallback);
    } catch {
        return writable(fallback);
    }
}
const getBool = (item: string, fallback: boolean) => {
    try {
        return writable((localStorage.getItem(item) === 'true') || fallback);
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
export const invertMode = getBool("invertMode", false);
export const previewMode = writable(false);
let previewModeValue = false;

previewMode.subscribe(value => {
    previewModeValue = value;
})
travelSpeed.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('travelSpeed', value.toString())
    }
})
spinSpeed.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('spinSpeed', value.toString())
    }
})
emblemSrc.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('emblemSrc', value.toString())
    }
})
emblemSize.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('emblemSize', value.toString())
    }
})
bgSrc.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('bgSrc', value.toString())
    }
})
invertMode.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem('invertMode', value.toString())
    }
})