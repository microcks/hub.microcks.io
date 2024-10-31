import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("http://localhost:4200");
  });

  test("should not has error logs", async ({ page }) => {
    const logs = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        logs.push(msg);
      }
    });
    expect(logs.length).toBe(0);
  });

  test("should display welcome message", async () => {
    const title = await page.textContent("h1");
    expect(title).toBe("Welcome to Hub Microcks.io");
  });

  test("should display 'Contribute' button", async () => {
    const button = await page.textContent("button");
    expect(button).toContain("Contribute");
  });

  test("should display 'Submit your mocks' link", async () => {
    await page.goto("http://localhost:4200/");
    await page.getByRole("link", { name: "Submit your mocks >" }).click();
    await expect(page.locator("h1")).toContainText(
      "How to contribute an API package"
    );
  });

  test.describe("Contribute button", () => {
    test("should display 'Contribute' button actions", async () => {
      await page.goto("http://localhost:4200/");
      await page.getByRole("button", { name: "Contribute" }).click();
      await expect(page.getByLabel("Contribute")).toContainText("Overview");
      await expect(page.getByLabel("Contribute")).toContainText(
        "Create API mocks and tests suite"
      );
      await expect(page.getByLabel("Contribute")).toContainText(
        "Package your API mocks and tests"
      );
      await expect(page.getByLabel("Contribute")).toContainText(
        "Submit your API package"
      );
    });
  });

  test.describe("Microcks.io", () => {
    test("should display 'Jump-start with Microcks' link", async () => {
      await page.goto("http://localhost:4200/");
      await page
        .getByRole("link", { name: "Jump-start with Microcks" })
        .click();
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Page Not Fount");
      expect(bodyText).not.toContain("404");
    });
  });
});
