import { db } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(300, "/");
    }

    let items = await db.item.findMany({
        where: { user: { id: locals.user.id } },
        include: { type: true },
    });

    let returnItems = items.map((item) => {
        return {
            count: item.count,
            name: item.type.name,
            cost: item.type.cost,
            icon: item.type.icon,
            id: item.id,
        };
    });

    return returnItems;
};
