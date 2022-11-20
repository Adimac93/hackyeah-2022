import { db } from "$lib/server/database";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const coins = await db.user.findFirst({
        where: { id: locals.user!.id },
        select: { coins: true },
    });
    return { coins: coins?.coins ?? 0 };
};
