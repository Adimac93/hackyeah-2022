import { writable } from "svelte/store";

export interface Point {
    x: number;
    y: number;
    title: string;
    description: string;
}

export const selectedPoint = writable<Point | null>(null);

selectedPoint.subscribe(console.log);