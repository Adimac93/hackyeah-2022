import type { PageServerLoad } from "./$types";

export const actions: PageServerLoad = ({ locals }) => {
    const user = locals.user!;
    return { score: user.score, email: user.email, username: user, coins: user.coins };
};
