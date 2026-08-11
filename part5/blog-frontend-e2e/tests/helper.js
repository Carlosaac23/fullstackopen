export async function loginWith(page, username, password) {
  await page.getByRole("link", { name: "login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
}

export async function createBlog(page, title, url) {
  await page.getByRole("link", { name: "new blog" }).click();
  await page.getByLabel("title").fill(title);
  await page.getByLabel("url").fill(url);
  await page.getByRole("button", { name: "add" }).click();
  await page.getByRole("link", { name: title }).waitFor();
}
