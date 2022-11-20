type Reward = {
    coins?: number,
    items?: { name: string, count: number }[],
}

export interface Task {
    area: string;
    cooldown: number;
    reward: Reward
}

export type FullTask = Task & {
    name: string,
    id: string,
}

export const tasks: Record<string, Task> = {
    "trash": {
        "area": "HOME",
        "cooldown": 60,
        "reward": {
            coins: 10,
            items: [{ name: "Glass Bottle", count: 1 }]
        }
    }
}