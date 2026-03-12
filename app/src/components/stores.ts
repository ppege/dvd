import { writable } from 'svelte/store';
import { browser } from '$app/env';

const getString = (item: string, fallback: string): string => {
	try {
		return localStorage.getItem(item) || fallback;
	} catch {
		return fallback;
	}
};
const getNumber = (item: string, fallback: string): number => {
	try {
		return parseInt(localStorage.getItem(item) || fallback);
	} catch {
		return parseInt(fallback);
	}
};
const getJSON = (item: string, fallback: any) => {
	try {
		return JSON.parse(localStorage.getItem(item) || `${fallback}`);
	} catch {
		return fallback;
	}
};

export const fullscreenEnabled = writable(false);
export const defaultEmblem = browser ? '/emblem.png' : 'https://color-hex.org/colors/ffffff.png';
export const defaultBg = browser ? '/bg.png' : 'https://color-hex.org/colors/ffffff.png';
export const travelSpeed = writable(getNumber('travelSpeed', '2'));
export const spinSpeed = writable(getNumber('spinSpeed', '0'));
export const emblemSize = writable(getNumber('emblemSize', '320'));
export const emblemSrc = writable(getString('emblemSrc', defaultEmblem));
export const bgSrc = writable(getString('bgSrc', defaultBg));
export const previewMode = writable(false);
export const selected = writable(getJSON('onCollision', ['Invert']));
export const presets = writable(
	getJSON('presets', {
		selected: 'DVD Screensaver',
		options: ['DVD Screensaver', 'Flag of Spin'],
		presets: {
			'DVD Screensaver': {
				name: 'DVD Screensaver',
				travelSpeed: 2,
				spinSpeed: 0,
				emblemSize: 320,
				emblemSrc: defaultEmblem,
				bgSrc: defaultBg,
				onCollision: ['Invert']
			},
			'Flag of Spin': {
				name: 'Flag of Spin',
				travelSpeed: 4,
				spinSpeed: 3,
				emblemSize: 320,
				emblemSrc:
					'https://upload.wikimedia.org/wikipedia/commons/8/85/Escudo_de_Espa%C3%B1a_%28mazonado%29.svg',
				bgSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Flag_of_Spain_%28civil%29.svg',
				onCollision: []
			}
		}
	})
);
let previewModeValue = false;

previewMode.subscribe((value) => {
	previewModeValue = value;
});
travelSpeed.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('travelSpeed', value.toString());
	}
});
spinSpeed.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('spinSpeed', value.toString());
	}
});
emblemSrc.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('emblemSrc', value);
	}
});
emblemSize.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('emblemSize', value.toString());
	}
});
bgSrc.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('bgSrc', value);
	}
});
selected.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('onCollision', JSON.stringify(value));
	}
});
presets.subscribe((value) => {
	if (browser && !previewModeValue) {
		localStorage.setItem('presets', JSON.stringify(value));
	}
});
