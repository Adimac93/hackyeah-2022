import { db } from "$lib/server/database";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    let coins = await db.user.findFirst({
        where: { id: locals.user!.id },
        select: { coins: true },
    });
    return { coins: coins || 0 };
};
