import { test, expect } from '@playwright/test';

test('Public Quote Submission', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Click the link to the quote page
  await page.click('text=Démarrer un Devis');

  // Verify that the URL is now /devis
  await expect(page).toHaveURL('/devis');

  // Step 1: Select project type
  await page.click('text=Application Web sur-mesure');
  await page.click('text=Suivant');

  // Step 2: Select features
  await page.click('text=Authentification des utilisateurs');
  await page.click('text=Paiements en ligne (Stripe, etc.)');
  await page.click('text=Suivant');

  // Step 3: Fill in email
  await page.fill('input[type="email"]', 'test@example.com');
  await page.click('text=Soumettre ma demande');

  // Verify that the URL is now /merci
  await expect(page).toHaveURL('/merci');
});
