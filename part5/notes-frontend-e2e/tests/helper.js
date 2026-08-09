export async function loginWith(page, username, password) {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
}

export async function createNote(page, content) {
  await page.getByRole("button", { name: "New note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByText(content).waitFor();
}
