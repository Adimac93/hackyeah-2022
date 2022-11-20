import { db } from "$lib/server/database";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const coinsPromise = db.user.findFirst({
        where: { id: locals.user!.id },
        select: { coins: true },
    });
    return { coins: (await coinsPromise)?.coins ?? 0 };
};
