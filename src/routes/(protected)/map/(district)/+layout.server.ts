import { db } from "$lib/server/database";
import { checkTask } from "$lib/server/task";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const coinsPromise = db.user.findFirst({
        where: { id: locals.user!.id },
        select: { coins: true },
    });
    const taskPromise = checkTask(locals.user!.id, "HOME");
    return { coins: (await coinsPromise)?.coins ?? 0, tasks: (await taskPromise) };
};
