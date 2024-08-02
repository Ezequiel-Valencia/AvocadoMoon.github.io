import { expect, test } from '@playwright/test';
import { encodeImage, decodeImage } from '../src/routes/cat_encryption/stegnography';

// test('index page has expected h1', async ({ page }) => {
// 	await page.goto('/');
// 	await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
// });