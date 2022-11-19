import { db } from "$lib/server/database";
import { invalid, type Actions } from "@sveltejs/kit";
import { hash } from "argon2";

export const actions: Actions = {
    default: async (event) => {
        let form = await event.request.formData();
        let email = form.get("email");
        let password = form.get("password");
        let rPassword = form.get("repeat-password");
        if (!email || !password || !rPassword) return { info: "missing fields" };

        email = email.toString();
        password = password.toString();

        password = await hash(password);
        if (!email) {
            return invalid(400, { email, missing: true });
        }
        if (!password) {
            return invalid(400, { password, missing: true });
        }

        let isAlreadyRegistered = await db.user.findUnique({ where: { email } });
        if (isAlreadyRegistered) return invalid(400, { info: "user already exists" });

        let session = await db.session.create({
            data: { user: { create: { email, password, coins: 0, username: "Hackyouser" } } },
        });
        console.log(session);
        event.cookies.set("session", session.id, { httpOnly: true, secure: true });
    },
};
