import { test, expect } from '@playwright/test';

test('user can log in, add an item, and complete checkout', async ({ page }) => {
  // 1. Log in
  await page.goto('https://www.saucedemo.com');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  // 2. Add a product to the cart
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Open the cart and verify the product is there
  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');

  // 4. Enter checkout details
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="postalCode"]').fill('500001');
  await page.locator('[data-test="continue"]').click();

  // 5. Finish the order and confirm
  await page.pause();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
});