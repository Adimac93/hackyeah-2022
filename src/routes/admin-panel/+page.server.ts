import { db } from "$lib/server/database";
import { invalid, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        let user = event.locals.user;
        if (!user)
            return invalid(401, {});

        let userGroup = user.group;
        if (!userGroup)
            return invalid(400, {});
        if (!userGroup.isOwner)
            return invalid(400, {});

        let form = await event.request.formData();
        let email = form.get("email");

        if (!email)
            return invalid(400, { info: "missing fields" });

        await db.groupInvite.create({ data: { group: userGroup.group, email: email } });
    },
};