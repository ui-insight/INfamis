import { expect, test } from "@playwright/test";

test("template homepage renders", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "INfamis" }),
  ).toBeVisible();
  await expect(
    page.getByText("Built from the UI-Insight TEMPLATE-app"),
  ).toBeVisible();
});
