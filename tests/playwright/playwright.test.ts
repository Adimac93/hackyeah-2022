import { test } from "@playwright/test";

test("index page works", async ({ page }) => {
    await page.goto("/");
});
