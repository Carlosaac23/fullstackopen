import { test, expect, describe, beforeEach } from "@playwright/test";

describe("Note app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText("Note app, Department of Computer Science, University of Helsinki 2025"),
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByLabel("username").fill("root");
    await page.getByLabel("password").fill("password");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Superuser logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByLabel("username").fill("root");
      await page.getByLabel("password").fill("password");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "New note" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "Save" }).click();

      await expect(page.getByText("a note created by playwright")).toBeVisible();
    });
  });
});
