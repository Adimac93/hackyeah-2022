import type { PageServerLoad } from "./$types";
import { AdminPanel } from "$lib/server/AdminPanel";
import { db } from "$lib/server/database";
import { UserHelper } from "$lib/server/UserHelper";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user!;

    const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (!userGroup) throw redirect(302, "/group-select");

    return {
        score: user.score,
        email: user.email,
        username: user.username,
        coins: user.coins,
        isOwner: userGroup.isOwner,
    };
};

export const actions: Actions = {
    default: async (event) => {
        const user = event.locals.user;
        if (!user) return invalid(401, {});

        const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (!userGroup) return invalid(400, {});

        const form = await event.request.formData();
        const type = form.get("type")?.toString();

        switch (type) {
            case "leave":
                if (userGroup.isOwner) break;

                await UserHelper.leaveGroup(user);
                throw redirect(302, "/group-select");
            case "delete":
                if (userGroup.isOwner) await AdminPanel.deleteGroup(userGroup.groupId);
                await UserHelper.leaveGroup(user);

                event.cookies.delete("session");
                await db.session.deleteMany({ where: { userId: user.id } });

                await db.user.delete({ where: { id: user.id } });
                throw redirect(302, "/register");
        }

        return invalid(400, { info: "missing fields" });
    },
};
