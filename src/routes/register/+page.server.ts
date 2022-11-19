import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import { hash } from "argon2";

export const load: PageServerLoad = async ({ locals }) => {
    let user = locals.user;
    if (user) throw redirect(302, "/group-select");
    return {};
};

export const actions: Actions = {
    default: async (event) => {
        let form = await event.request.formData();
        let email = form.get("email");
        let password = form.get("password");
        let rPassword = form.get("repeat-password");

        if (!email || !password || !rPassword) {
            return invalid(400, { email, missing: true });
        }
        if (password != rPassword) {
            return invalid(400, { email, incorrect: true });
        }

        email = email.toString();
        password = password.toString();

        password = await hash(password);

        let isAlreadyRegistered = await db.user.findUnique({ where: { email } });
        if (isAlreadyRegistered) return invalid(400, { info: "user already exists" });

        let session = await db.session.create({
            data: { user: { create: { email, password, coins: 0, username: "Hackyouser" } } },
        });

        event.cookies.set("session", session.id, { httpOnly: true, secure: true });

        throw redirect(300, "/group-select");
    },
};
