import { test } from "./fixtures";
import { HomePage } from "./pages/home-page";

test.describe("Portfolio smoke", () => {
  test("loads home and key CTAs exist", async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.assertHeroVisible();
    await home.downloadResume();
  });
});
