import { db } from "$lib/server/database";
import { invalid, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async (event) => {
        let user = event.locals.user;
        if (!user)
            return invalid(401, {});

        let userGroup = await db.userGroup.findUnique({ where: { userId: user.id } });
        if (userGroup)
            return invalid(400, { info: "This user already has a group."});

        let form = await event.request.formData();
        let name = form.get("name");

        if (!name)
            return invalid(400, { info: "missing fields" });

        await db.userGroup.create({ data: {
            group: { create: { name: name.toString() } },
            user: { connect: { id: user.id }},
            isOwner: true
        }});
    },
};
