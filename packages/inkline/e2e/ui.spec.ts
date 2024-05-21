import { test, expect } from '@playwright/test';

test('should have button links', async ({ page }) => {
    await page.goto('/');

    const buttonLink = await page.getByRole('link', { name: 'Button Link' });
    await expect(buttonLink).toBeVisible();
    await expect(buttonLink).toHaveAttribute('href', 'https://inkline.io');

    const buttonRoute = await page.getByRole('link', { name: 'Button Route' });
    await expect(buttonRoute).toBeVisible();
    await expect(buttonRoute).toHaveAttribute('href', '/docs/components/button');
});

test('should update form validation', async ({ page }) => {
    const value = 'abc';

    await page.goto('/');

    const input = await page.$('.form input[name="input"]');
    await input.fill(value);
    const inputValue = await input.inputValue();
    await expect(inputValue).toEqual(value);

    const preNodes = await page.$$('.form pre');
    const formPreNode = preNodes[0];
    const formPreTextContent = await formPreNode.textContent();
    await expect(formPreTextContent).toContain('"input": "abc"');

    const schemaPreNode = preNodes[1];
    const schemaPreTextContent = await schemaPreNode.textContent();
    await expect(schemaPreTextContent).toContain('"value": "abc"');
});
