import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const trades = await db.trade.findMany({
        where: {
            sourceUser: {
                group: { group: { is: { users: { some: { user: { id: locals.user!.id } } } } } },
            },
        },
        select: {
            sourceUser: { select: { username: true } },
            id: true,
            cost: true,
            items: {
                select: {
                    item: { select: { type: { select: { name: true, icon: true } } } },
                },
            },
        },
    });

    const returnTrades = trades.map((trade) => {
        return {
            id: trade.id,
            cost: trade.cost,
            username: trade.sourceUser.username,
            items: trade.items.map((element) => {
                return {
                    name: element.item.type.name,
                    icon: element.item.type.icon,
                };
            }),
        };
    });

    return { trades: returnTrades };
};
