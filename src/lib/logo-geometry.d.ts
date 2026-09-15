export type Point = [number, number];
export type Arc = {from: Point; to: Point; circle?: [number, number, number]; add?: boolean};
export type Part = {name: string; start: Point; arcs: Arc[]};
export const W: number;
export const H: number;
export const parts: Part[];
export const smoothJoints: {point: Point; tangent: Point; error: number}[];
export function pathFor(part: Part): string;
