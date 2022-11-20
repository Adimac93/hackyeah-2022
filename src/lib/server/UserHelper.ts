import type { User } from "@prisma/client";
import { db } from "./database";

export class UserHelper {
    static async spendCoins(user: User, amount: number): Promise<boolean> {
        if (amount <= 0)
            throw new Error("Amount must be a number greater than zero.");

        let updated = await db.user.update({
            where: { id: user.id },
            data: { coins: {
                decrement: amount
            } }
        });

        if (updated.coins < 0) {
            await db.user.update({
                where: { id: user.id },
                data: { coins: {
                    increment: amount
                } }
            });
            return false;
        }

        return true;
    }
}
