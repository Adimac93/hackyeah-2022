import { AdminPanel } from "$lib/server/AdminPanel";
import { db } from "$lib/server/database";
import { UserHelper } from "$lib/server/UserHelper";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        throw redirect(302, "/401");

    let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (!userGroup)
        throw redirect(302, "/group-select");

    return {
        isOwner: userGroup.isOwner
    };
};

export const actions: Actions = {
    default: async (event) => {
        let user = event.locals.user;
        if (!user)
            return invalid(401, {});

        const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (!userGroup)
            return invalid(400, {});

        const form = await event.request.formData();
        let type = form.get("type")?.toString();

        switch (type) {
            case "leave":
                if (userGroup.isOwner)
                    break;

                await UserHelper.leaveGroup(user);
                throw redirect(302, "/group-select");
            case "delete":
                if (userGroup.isOwner)
                    await AdminPanel.deleteGroup(userGroup.groupId);
                await UserHelper.leaveGroup(user);

                event.cookies.delete("session");
                await db.session.deleteMany({ where: { userId: user.id } });

                await db.user.delete({ where: { id: user.id } });
                throw redirect(302, "/register");
        }
        
        return invalid(400, { info: "missing fields" });
    },
};
