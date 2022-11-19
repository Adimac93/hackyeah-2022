import { db } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        return { status: 401 };

    let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (userGroup)
        throw redirect(302, "/");

    return {
        invites: (await db.groupInvite.findMany({ where: { email: user.email }})).map(x => x.groupId)
    };
}
