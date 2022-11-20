import { db } from "$lib/server/database";
import { UserHelper } from "$lib/server/UserHelper";
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
        let user = event.locals.user;
        if (!user)
            return invalid(401, {});

        let form = await event.request.formData();
        let offerId = form.get("shopOfferId")?.toString();
        let count = form.get("shopOfferCount")?.toString();
        if (!offerId || !count)
            return invalid(400, {});

        let countI = Number.parseInt(count);
        if (countI <= 0)
            return invalid(400, {});

        let offer = await db.shopOffert.findUnique({ where: { id: offerId } });
        if (!offer)
            return invalid(400, {});

        if (!UserHelper.spendCoins(user, offer.cost * countI))
            return { success: false };
        
        await db.item.create({ data: {
            count: countI,
            type: { connect: { id: offer.typeId } },
            user: { connect: { id: user.id } }            
        } });
    },
};
