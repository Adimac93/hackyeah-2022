import { districts } from "$lib/server/districts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { districts };
};
