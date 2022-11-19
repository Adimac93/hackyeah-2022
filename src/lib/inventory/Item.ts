export interface PartialItem {
    id: string,
    name: string;
    icon: string;
    count: number;
}

export type Item = PartialItem & {
    cost: number;
}
