import { db } from "$lib/server/database";
import type { PageServerLoad } from "./$types";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import { verify } from "argon2";

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
        if (!email || !password) return invalid(400, { info: "missing fields" });
        if (!email) {
        }
        email = email.toString();
        password = password.toString();

        let user = await db.user.findUnique({ where: { email } });
        if (!user) {
            return invalid(400, { email, incorrect: true });
        }

        let isVerified = await verify(user.password, password);
        if (!isVerified) {
            return invalid(400, { email, incorrect: true });
        }

        let session = await db.session.create({
            data: { user: { connect: { id: user.id } } },
        });

        event.cookies.set("session", session.id);

        throw redirect(300, "/group-select");
    },
};
