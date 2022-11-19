import { db } from "$lib/server/database";
import { invalid, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (!user)
        throw redirect(302, "/401");

    let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
    if (userGroup)
        throw redirect(302, "/");

    return {
        invites: Promise.all((await db.groupInvite.findMany({ where: { email: user.email }})).map(async (invite) => {
            let group = await db.group.findUnique({ where: { id: invite.groupId } });
            if (!group)
                throw new Error("Group id not found.");
    
            let owner = await db.userGroup.findFirstOrThrow({ where: {
                groupId: group.id,
                isOwner: true
            } });
            if (!owner)
                throw new Error("Owner group not found.");
    
            let ownerUser = await db.user.findUniqueOrThrow({ where: { id: owner.userId } });
            if (!ownerUser)
                throw new Error("Owner user not found.");
    
            return {
                group: {
                    id: group.id,
                    name: group.name
                },
                senderUsername: ownerUser.username,
                senderEmail: ownerUser.email
            };
        })).then(x => x)
    };
}
