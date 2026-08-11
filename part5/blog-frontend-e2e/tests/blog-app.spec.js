import { test, expect, beforeEach, describe } from "@playwright/test";
import { loginWith, createBlog } from "./helper";

describe("Blog app", () => {
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

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("link", { name: "login" }).click();

    const usernameInput = await page.getByLabel("username");
    const passwordInput = await page.getByLabel("password");

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "johndoe3", "password");

      await expect(page.getByText("John Doe logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "johndoe3", "wrong_password");

      const errorDiv = page.locator(".error");

      await expect(errorDiv).toContainText("invalid username or password");
      await expect(page.getByText("John Doe logged in")).not.toBeVisible();
    });

    test("only logged-in users can like a blog", async ({ page }) => {
      await loginWith(page, "johndoe3", "password");
      await createBlog(page, "a blog that can not be liked", "www.not.com");
      await page.getByRole("button", { name: "logout" }).click();

      await page.getByRole("link", { name: "a blog that can not be liked" }).click();

      await expect(page.getByRole("button", { name: "like" })).not.toBeAttached();
    });

    describe("when logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "johndoe3", "password");
        await createBlog(page, "a blog created by playwright", "www.testing.com");
      });

      test("a new blog can be created", async ({ page }) => {
        const successDiv = page.locator(".success");

        await expect(successDiv).toContainText("a blog created by playwright");
      });

      test("and the blog can be liked", async ({ page }) => {
        await page.getByRole("link", { name: "a blog created by playwright" }).click();

        const likeCounter = page.locator(".like-span");
        await expect(likeCounter).toHaveText("0");

        await page.getByRole("button", { name: "like" }).click();

        await expect(likeCounter).toHaveText("1");
      });

      test("the user who created the blog can delete it", async ({ page }) => {
        await page.getByRole("link", { name: "a blog created by playwright" }).click();

        const deleteButton = page.getByRole("button", { name: "Delete" });
        await expect(deleteButton).toBeVisible();

        page.once("dialog", (dialog) => dialog.accept());

        await deleteButton.click();

        const successDiv = page.locator(".success");
        await expect(successDiv).toContainText("Blog deleted successfully");
      });
    });

    describe("only an author can see a delete button", () => {
      beforeEach(async ({ page, request }) => {
        await request.post("/api/users", {
          data: {
            name: "Carlos Acosta",
            username: "carlosaac23",
            password: "password",
          },
        });

        await page.goto("/");
      });

      test("seeing a blog from another author", async ({ page }) => {
        await loginWith(page, "carlosaac23", "password");
        await createBlog(page, "another blog by playwright", "www.test.com");
        await page.getByRole("button", { name: "logout" }).click();

        await loginWith(page, "johndoe3", "password");

        await page.getByRole("link", { name: "another blog by playwright" }).click();

        await expect(page.getByRole("button", { name: "Delete" })).not.toBeAttached();
      });
    });
  });
});
