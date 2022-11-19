import { db } from "$lib/server/database";
import { invalid, type Actions } from "@sveltejs/kit";
import { verify } from "argon2";

export const actions: Actions = {
    default: async (event) => {
        let form = await event.request.formData();
        let email = form.get("email");
        let password = form.get("password");
        if (!email || !password) return invalid(400, { info: "missing fields" });

        email = email.toString();
        password = password.toString();

        let user = await db.user.findUnique({ where: { email } });
        if (user) {
            console.log(password);
            let isVerified = await verify(user.password, password);
            if (isVerified) {
                let session = await db.session.create({
                    data: { user: { connect: { id: user.id } } },
                });
                event.cookies.set("session", session.id);
            }
        }
    },
};
