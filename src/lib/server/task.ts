import type { Area } from ".prisma/client";
import { db } from "./database";

export const checkTask = async (userId: string, area: Area) => {
    let tasks = await db.task.findMany({ where: { area, user: { id: { equals: userId } } } });

    let returnedTasks = await Promise.all(
        tasks.map(async (task) => {
            let now = new Date();
            let diff = Math.abs(now.valueOf() - task.lastAccessed.valueOf());
            if (diff >= task.timeToRestart * 1000) {
                return { name: task.name, area: task.area };
            }
        })
    );

    return returnedTasks;
};

export const createTask = async (
    userId: string,
    name: string,
    area: Area,
    secondsToRestart: number
) => {
    let now = new Date();
    let task = await db.task.create({
        data: {
            name,
            area,
            user: { connect: { id: userId } },
            lastAccessed: now,
            timeToRestart: secondsToRestart * 1000,
        },
    });
};
