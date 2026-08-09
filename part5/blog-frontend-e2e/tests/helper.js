export async function loginWith(page, username, password) {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
}

export async function createBlog(page, title, url) {
  await page.getByRole("button", { name: "Create new blog" }).click();
  await page.getByLabel("title").fill(title);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "add" }).click();
  await page.getByRole("heading", { level: 3, name: title }).waitFor();
}
