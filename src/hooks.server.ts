import { db } from "$lib/server/database";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get("session");

    if (session) {
        const s = await db.session.findUnique({ where: { id: session } });
        if (s) {
            const user = await db.user.findUnique({ where: { id: s.userId } });
            if (user) {
                event.locals.user = user;
            } else {
                console.warn("Session has invalid user Id.");
            }
        }
    }

    return await resolve(event);
};
