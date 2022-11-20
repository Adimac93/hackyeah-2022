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

    static async giveCoins(user: User, amount: number): Promise<void> {
        if (amount <= 0)
            throw new Error("Amount must be a number greater than zero.");

        await db.user.update({
            where: { id: user.id },
            data: { coins: {
                increment: amount
            } }
        });
    }

    static async giveItem(user: User, itemType: string, count: number) {
        // await db.item.upsert({
        //     where: {

        //     },
        //     create: {

        //     }
        // })
    }

    static async leaveGroup(user: User) {
        await db.userGroup.deleteMany({ where: { userId: user.id } });
        await db.item.deleteMany({ where: { userId: user.id } });
    }
}
