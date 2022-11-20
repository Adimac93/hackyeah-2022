import { db } from "$lib/server/database";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        if (!event.locals.user) throw redirect(303, "/");

        const session = event.cookies.get("session");
        event.cookies.delete("session");
        await db.session.delete({ where: { id: session } });
        throw redirect(303, "/login");
    },
};
