import { db } from "$lib/server/database";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        throw redirect(303, "/401");

    let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (!userGroup)
        throw redirect(303, "/401");

    return {
        isOwner: userGroup.isOwner
    };
};
