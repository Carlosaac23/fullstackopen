import { test, expect, describe, beforeEach } from "@playwright/test";
import { loginWith, createNote } from "./helper.js";

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "John Doe",
        username: "johndoe3",
        password: "password",
      },
    });

    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText("Note app, Department of Computer Science, University of Helsinki 2025"),
    ).toBeVisible();
  });

  test("user can log in", async ({ page }) => {
    await loginWith(page, "johndoe3", "password");

    await expect(page.getByText("John Doe logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "johndoe3", "password");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");

      await expect(page.getByText("a note created by playwright")).toBeVisible();
    });

    describe("and several notes exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("one of those can be made not important", async ({ page }) => {
        await page.pause();
        const otherNoteText = page.getByText("second note");
        const otherNoteElement = otherNoteText.locator("..");

        await otherNoteElement.getByRole("button", { name: "make not important" }).click();
        await expect(otherNoteElement.getByText("make important")).toBeVisible();
      });
    });
  });

  test("login fails with wrong password", async ({ page }) => {
    await loginWith(page, "johndoe3", "wrong_password");

    const errorDiv = page.locator(".error");
    await expect(errorDiv).toContainText("wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("John Doe logged in")).not.toBeVisible();
  });
});
