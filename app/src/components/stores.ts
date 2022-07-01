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
const getJSON = (item: string, fallback: any) => {
    try {
        return JSON.parse(localStorage.getItem(item) || `${fallback}`);
    } catch {
        return fallback;
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
export const selected = writable(getJSON("onCollision", ["Invert"]));
export const presets = writable(getJSON("presets", {
    selected: "DVD Screensaver",
    options: ["DVD Screensaver", "Flag of Spin"],
    presets: {
        "DVD Screensaver": {
            name: "DVD Screensaver",
            travelSpeed: 2,
            spinSpeed: 0,
            emblemSize: 320,
            emblemSrc: defaultEmblem,
            bgSrc: defaultBg,
            onCollision: ["Invert"]
        },
        "Flag of Spin": {
            name: "Flag of Spin",
            travelSpeed: 4,
            spinSpeed: 3,
            emblemSize: 320,
            emblemSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_Arms_of_Spain.svg/1052px-Coat_of_Arms_of_Spain.svg.png?20220624143818",
            bgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Simplified_Flag_of_Spain_%28civil_variant%29.svg/1599px-Simplified_Flag_of_Spain_%28civil_variant%29.svg.png?20120913124912",
            onCollision: []
        }
    }
}))
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
presets.subscribe(value => {
    if (browser && !previewModeValue) {
        localStorage.setItem("presets", JSON.stringify(value))
    }
})