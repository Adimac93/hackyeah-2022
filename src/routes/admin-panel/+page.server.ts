import { db } from "$lib/server/database";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        throw redirect(302, "/401");

    let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (!userGroup || !userGroup.isOwner)
        throw redirect(302, "/401");

    return {
        users: await db.userGroup.findMany({
            where: { groupId: userGroup.groupId },
            select: {
                isOwner: true,
                user: { 
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        })
    };
}

export const actions: Actions = {
    default: async (event) => {
        let user = event.locals.user;
        if (!user)
            return invalid(401, {});

        let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (!userGroup)
            return invalid(400, {});
        if (!userGroup.isOwner)
            return invalid(400, {});

        let form = await event.request.formData();
        let email = form.get("email");

        if (!email)
            return invalid(400, { info: "missing fields" });

        await db.groupInvite.create({ data: {
            group: { connect: { id: userGroup.groupId } },
            email: email.toString()
        } });
    },
};
