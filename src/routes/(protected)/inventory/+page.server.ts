import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const items = await db.item.findMany({
        where: { user: { id: locals.user!.id } },
        include: { type: true },
    });

    const returnItems = items.map((item) => {
        return {
            count: item.count,
            name: item.type.name,
            cost: item.type.cost,
            icon: item.type.icon,
            id: item.id,
        };
    });

    return { data: returnItems };
};
