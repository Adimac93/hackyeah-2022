import { db } from "$lib/server/database";

export const addScore = async (userId: string, value: number) => {
    await db.user.update({ where: { id: userId }, data: { score: { increment: value } } });
};
