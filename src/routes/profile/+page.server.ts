import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
    const user = locals.user!;
    return { score: user.score, email: user.email, username: user.username, coins: user.coins };
};
