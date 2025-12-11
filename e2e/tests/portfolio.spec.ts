import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto('/');
    // Wait for preloader to disappear (it has a minimum 1.6s delay + animation)
    await expect(page.locator('.loader-curtain')).toBeHidden({ timeout: 15000 });
  });

  test('Architect Mode (Default) Loads Correctly', async ({ page }) => {
    // Expect the title "Specialized Software Engineer" or Name
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Ajdin');

    // Check for the "Mode: Architect" toggle state
    const modeToggle = page.locator('.mode-trigger');
    await expect(modeToggle).toBeVisible();
    await expect(modeToggle).toContainText('Mode: Architect');

    // Verify Architect-specific content is visible
    // "Forging digital reality" is the creative text, "Ajdin Sahinovic" is architect text in Hero
    const heroHeading = page.locator('h1.hero-fade');
    await expect(heroHeading).toHaveText(/Ajdin/);

    // Verify code snippet (Architect visual) is present
    const codeSnippet = page.locator('.architect-code');
    // Note: It might be hidden on mobile, so we conditionally check or force desktop viewport in config
    // But for general check:
    await expect(codeSnippet).toBeVisible();
  });

  test('Switch to Personality Mode and Verify Changes', async ({ page }) => {
    const modeToggle = page.locator('.mode-trigger');

    // Click to switch
    await modeToggle.click();

    // Verify button text changes
    await expect(modeToggle).toContainText('Mode: Personality');

    // Verify Hero text changes to creative slogan
    const heroHeading = page.locator('h1.hero-fade');
    await expect(heroHeading).toHaveText('Forging digital reality.');

    // Verify "Dream Garage" section (CarCollection) is visible
    // This section is only fully appreciated in creative mode, though technically might exist in DOM
    // We check if we can interact with it or see it.
    const carHeader = page.getByText('My Dream Garage');
    await carHeader.scrollIntoViewIfNeeded();
    await expect(carHeader).toBeVisible();

    // Verify visual style changes (Background color checks are tricky but we can check class changes or attributes)
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-black/, { timeout: 1000 }); // Should become black in creative mode
  });

  test('Car Collection Interaction (Focus & Flip)', async ({ page }) => {
    // Switch to creative mode first
    await page.locator('.mode-trigger').click();
    
     // Scroll to cars
    const carHeader = page.getByText('My Dream Garage');
    await carHeader.scrollIntoViewIfNeeded();

    // Find the first car card
    const firstCar = page.locator('.car-card-container').first();
    
    // Test Keyboard Interaction (Enter to flip)
    await firstCar.focus();
    await page.keyboard.press('Enter');

    // Check if the back is visible (we can check if the 'rotate-y-180' class is applied)
    const innerCard = firstCar.locator('.car-card');
    await expect(innerCard).toHaveClass(/rotate-y-180/);

    // Press Enter again to flip back
    await page.keyboard.press('Enter');
    await expect(innerCard).not.toHaveClass(/rotate-y-180/);
  });

  test('Navigation and Footer', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Verify Footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Built by');
    
    // Verify Email/LinkedIn/GitHub links exist
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeVisible();
  });

  test('Project Spotlight Interaction', async ({ page }) => {
     const spotlightSection = page.getByText('Project Spotlight');
     await spotlightSection.scrollIntoViewIfNeeded();
     await expect(spotlightSection).toBeVisible();

     // Verify slider exists
     const slider = page.getByRole('slider');
     await expect(slider).toBeVisible();
     
     // Check default aria value
     await expect(slider).toHaveAttribute('aria-valuenow', '50');
  });
  
  test('Accessibility Attributes (Basic Check)', async ({ page }) => {
    // Check main landmark
    await expect(page.locator('main')).toBeVisible(); // Next.js usually wraps in main or we should have one
    // Actually we might check for 'header' and 'footer' roles which we know exist
    await expect(page.getByRole('banner')).toBeVisible(); // Header
    await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer
    
    // Check alt text presence on a known image
    const spotlightSection = page.getByText('Project Spotlight');
    await spotlightSection.scrollIntoViewIfNeeded();
    const projectImg = page.locator('img[alt="Before comparison image"]');
    await expect(projectImg).toBeVisible();
  });
});
