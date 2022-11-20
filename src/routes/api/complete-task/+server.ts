import type { RequestHandler } from "@sveltejs/kit";
import { completeTask } from "$lib/server/task";
import { tasks } from "$lib/task";
import { UserHelper } from "$lib/server/UserHelper";

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.user)
        throw new Error("Invalid user");
    const { id, name } = await request.json();
    await completeTask(id as string, tasks[name].cooldown);
    if (tasks[name].reward.coins) {
        UserHelper.giveCoins(locals.user, tasks[name].reward.coins!);
    }

    for (const item of tasks[name].reward.items ?? []) {

    }

    return new Response();
}