import { db } from "$lib/server/database";
import { checkTask } from "$lib/server/task";
import { Area } from ".prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const tasks = await checkTask(locals.user!.id, Area.PILE);

    return tasks;
};
