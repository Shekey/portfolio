import { Page, expect } from "@playwright/test";

export class HomePage {
  constructor(private readonly page: Page) {}

  async setMode(isCreative: boolean) {
    await this.page.addInitScript(
      ({ isCreative }) => {
        try {
          localStorage.setItem(
            "ajdin-sahinbegovic-resume-view-mode",
            JSON.stringify({ state: { isCreative }, version: 0 })
          );
        } catch {
          // ignore
        }
      },
      { isCreative }
    );
  }

  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
    await this.waitForLoaderGone();
  }

  async assertHeroVisible() {
    await this.page.waitForSelector(`h1:has-text("Ajdin Šahinbegović")`, {
      state: "visible",
    });
  }

  async openFooterLinks() {
    const footer = this.page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await expect(footer.getByRole("link", { name: /linkedin/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /github/i })).toBeVisible();
    await expect(footer.getByRole("link", { name: /email/i })).toBeVisible();
  }

  async downloadResume() {
    const resumeLink = this.page.getByTestId("resume-link");
    await expect(resumeLink).toBeVisible();
    await resumeLink.click();
  }

  async toggleMode() {
    const toggle = this.page.getByTestId("mode-toggle");
    await expect(toggle).toBeVisible();
    await toggle.click();
  }

  async openCreativeContacts() {
    const contactSection = this.page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection.getByText(/coffee/i)).toBeVisible();
    await expect(
      contactSection.getByRole("link", { name: /linkedin/i })
    ).toBeVisible();
    await expect(
      contactSection.getByRole("link", { name: /github/i })
    ).toBeVisible();
    await expect(
      contactSection.getByRole("link", { name: /email/i })
    ).toBeVisible();
  }

  async waitForCreativeHero() {
    const creativeHeading = this.page
      .getByRole("heading", { level: 1, name: /not your/i })
      .first();
    await creativeHeading.waitFor({ state: "visible", timeout: 10000 });
  }

  async waitForLoaderGone() {
    const loader = this.page.locator(".loader-content");
    const curtain = this.page.locator(".loader-curtain");

    await Promise.all([
      loader.waitFor({ state: "detached", timeout: 12000 }).catch(() => {}),
      curtain.waitFor({ state: "detached", timeout: 12000 }).catch(() => {}),
    ]);
  }
}
