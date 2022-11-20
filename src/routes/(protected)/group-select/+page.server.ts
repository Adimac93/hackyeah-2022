import { db } from "$lib/server/database";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user!;
    const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (userGroup) throw redirect(302, "/");

    return {
        invites: Promise.all(
            (await db.groupInvite.findMany({ where: { email: user.email } })).map(
                async (invite) => {
                    const group = await db.group.findUnique({ where: { id: invite.groupId } });
                    if (!group) throw new Error("Group id not found.");

                    const owner = await db.userGroup.findFirstOrThrow({
                        where: {
                            groupId: group.id,
                            isOwner: true,
                        },
                    });
                    if (!owner) throw new Error("Owner group not found.");

                    const ownerUser = await db.user.findUniqueOrThrow({
                        where: { id: owner.userId },
                    });
                    if (!ownerUser) throw new Error("Owner user not found.");

                    return {
                        group: {
                            id: group.id,
                            name: group.name,
                        },
                        senderUsername: ownerUser.username,
                        senderEmail: ownerUser.email,
                    };
                }
            )
        ).then((x) => x),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const user = event.locals.user;
        if (!user) return invalid(401, {});

        const userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (userGroup) return invalid(400, { info: "This user already has a group." });

        const form = await event.request.formData();
        const groupId = form.get("groupId")?.toString();

        if (!groupId) return invalid(400, { info: "missing fields" });

        await db.groupInvite.deleteMany({ where: { groupId, email: user.email } });

        await db.userGroup.create({
            data: {
                group: { connect: { id: groupId } },
                user: { connect: { id: user.id } },
                isOwner: false,
            },
        });
    },
};
