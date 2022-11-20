import { db } from "./database";

export class AdminPanel {
    static async deleteGroup(groupId: string) {
        await db.groupInvite.deleteMany({ where: { groupId } });
        await db.userGroup.deleteMany({ where: { groupId } });
        await db.group.delete({ where: { id: groupId } });
    }
}
