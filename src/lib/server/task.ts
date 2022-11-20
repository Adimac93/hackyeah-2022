import type { Area } from "@prisma/client";
import { db } from "./database";

export const checkTask = async (userId: string, area: Area) => {
    let tasks = await db.task.findMany({ where: { area, user: { id: { equals: userId } } } });

    let returnedTasks = await Promise.all(
        tasks.map(async (task) => {
            let now = new Date();
            let diff = Math.abs(now.valueOf() - task.lastAccessed.valueOf());
            if (diff >= task.timeToRestart * 1000) {
                return { id: task.id, name: task.name, area: task.area };
            }
        })
    );

    return returnedTasks.filter((task) => task != undefined);
};

export const completeTask = async (
    taskId: string,
    secondsToRestart: number
) => {
    let now = new Date();
    await db.task.update({
        where: {
            id: taskId
        },
        data: {
            lastAccessed: now,
            timeToRestart: secondsToRestart,
        },
    });
};
