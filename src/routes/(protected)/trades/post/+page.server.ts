import { db } from "$lib/server/database";
import { invalid, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const items = await db.item.findMany({
        where: {
            user: {
                id: locals.user!.id,
            },
        },
        include: {
            type: true,
        },
    });

    return { items };
};

export const actions: Actions = {
    default: async ({ locals, request }) => {
        if (!locals.user) {
            throw redirect(303, "/login");
        }

        const data = await request.formData();
        const costStr = data.get("cost");
        if (!costStr) {
            throw invalid(400);
        }
        const cost = parseInt(costStr.toString());

        await db.trade.create({
            data: {
                cost: cost,
                sourceUser: {
                    connect: {
                        id: locals.user.id,
                    },
                },
            },
        });
    },
};
