import { db } from "$lib/server/database";
import { invalid, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        let user = event.locals.user;
        if (!user) throw redirect(300, "/");

        let session = event.cookies.get("session");
        event.cookies.delete("session");
        await db.session.delete({ where: { id: session } });
        throw redirect(300, "/");
    },
};
