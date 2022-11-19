import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        return { status: 401 };

    return {
        invites: (await db.groupInvite.findMany({ where: { email: user.email }})).map(x => x.groupId)
    };
}
