import { db } from "$lib/server/database";
import { invalid, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        offers: db.shopOffert.findMany({
            include: {
                type: {
                    select: {
                        icon: true,
                        name: true,
                    },
                },
            },
        }),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const user = event.locals.user;
        if (!user) return invalid(401, {});

        const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (!userGroup) return invalid(400, {});
        if (!userGroup.isOwner) return invalid(400, {});

        const form = await event.request.formData();

        const email = form.get("email");
        if (email) {
            await db.groupInvite.create({
                data: {
                    group: { connect: { id: userGroup.groupId } },
                    email: email.toString(),
                },
            });
            return;
        }

        const userId = form.get("userId")?.toString();
        if (userId) {
            const group = await db.group.findUniqueOrThrow({
                where: { id: userGroup.groupId },
                include: { users: true },
            });

            const f = group.users.find((x) => x.groupId == group.id);
            if (!f) return invalid(401, {});
            if (f.isOwner) return invalid(400, { info: "Unable to kick owner of the group." });

            await db.user.update({
                where: { id: userId },
                data: { group: undefined },
            });

            await db.userGroup.delete({ where: { userId } });

            return;
        }

        return invalid(400, { info: "missing fields" });
    },
};
