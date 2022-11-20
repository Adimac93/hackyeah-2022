import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv"
import * as fs from "fs/promises";
dotenv.config({ path: "../.env" });

const db = new PrismaClient();

const items = JSON.parse(await fs.readFile("./items.json", { encoding: "utf-8" }));
await db.itemType.deleteMany();
await db.itemType.createMany({
    data: items
});
