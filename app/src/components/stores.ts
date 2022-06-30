import { writable } from 'svelte/store'
import { browser } from '$app/env';

const getString = (item: string, fallback: string): string => {
    try {
        return localStorage.getItem(item) || fallback;
    } catch {
        return fallback;
    }
}
const getNumber = (item: string, fallback: string): number => {
    try {
        return parseInt(localStorage.getItem(item) || fallback);
    } catch {
        return parseInt(fallback);
    }
}
const getArray = (item: string): string[] => {
    try {
        return JSON.parse(localStorage.getItem(item) || "['Invert']");
    } catch {
        return ['Invert'];
    }
}

export const defaultEmblem = browser?"/emblem.png":"https://color-hex.org/colors/ffffff.png";
export const defaultBg = browser?"/bg.png":"https://color-hex.org/colors/ffffff.png";
export const travelSpeed = writable(getNumber("travelSpeed", "2"));
export const spinSpeed = writable(getNumber("spinSpeed", "0"));
export const emblemSize = writable(getNumber("emblemSize", "320"));
export const emblemSrc = writable(getString("emblemSrc", defaultEmblem));
export const bgSrc = writable(getString("bgSrc", defaultBg));
export const previewMode = writable(false);
export const selected = writable(getArray("onCollision"));
let previewModeValue = false;

previewMode.subscribe(value => {
    previewModeValue = value;
})
travelSpeed.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("travelSpeed", value.toString())
    }
})
spinSpeed.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("spinSpeed", value.toString())
    }
})
emblemSrc.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("emblemSrc", value)
    }
})
emblemSize.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("emblemSize", value.toString())
    }
})
bgSrc.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("bgSrc", value)
    }
})
selected.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("onCollision", JSON.stringify(value))
    }
})