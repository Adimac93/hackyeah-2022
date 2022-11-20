import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import { verify } from "argon2";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) throw redirect(302, "/group-select");
    return {};
};

export const actions: Actions = {
    default: async (event) => {
        const form = await event.request.formData();
        let email = form.get("email");
        let password = form.get("password");
        if (!email || !password) return invalid(400, { info: "missing fields" });

        email = email.toString();
        password = password.toString();

        const user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return invalid(400, { email, incorrect: true });
        }

        const isVerified = await verify(user.password, password);
        if (!isVerified) {
            return invalid(400, { email, incorrect: true });
        }

        const session = await db.session.create({
            data: { user: { connect: { id: user.id } } },
        });

        event.cookies.set("session", session.id);

        throw redirect(302, "/group-select");
    },
};
