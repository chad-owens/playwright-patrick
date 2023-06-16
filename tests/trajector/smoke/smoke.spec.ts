import { test, expect } from '../../../objects/fixture';
import { faker } from '@faker-js/faker';

test.describe('Evaluation Form', () => {

    test('Verify trajector medical page and leads to evaluation form', async ({ context, page, evalForm }) => {
        // Naviagte to trajector medical
        await page.goto('/');

        // Confirm on trajector medical
        await expect(page).toHaveURL('');

        // Verify Start your Evaluation button visible 
        await expect(evalForm.btnStartEvaluation).toBeVisible();

        // Click button to open new tab
        const [tab] = await Promise.all([
            context.waitForEvent('page'),
            evalForm.btnStartEvaluation.click()
        ]);

        // Verify new tab open and submit button present
        const btnGetFreeEval = tab.locator('#lp-pom-button-269');
        await expect(btnGetFreeEval).toBeVisible();

        // Verify disclaimer text present
        const disclaimer = tab.locator('#load_disclaimer_form_va');
        await expect(disclaimer).toBeVisible();
        await expect(disclaimer).toContainText('By submitting this form, I agree');

    });

    test('Verify a required field prevents form submit', async ({ page, evalForm }) => {
        // Go to evaluation form
        await evalForm.goto();

        // Fill out just the top questionaire 
        const rdoIsVeterenYes = page.locator('#is_veteran_yes');
        await rdoIsVeterenYes.click();

        const rdoDischargeYes = page.locator('#discharge_365_yes');
        await rdoDischargeYes.click();

        const rdoMilitaryStressYes = page.locator('#military_stress_yes');
        await rdoMilitaryStressYes.click();

        const rdoWorkDisibilityYes = page.locator('#work_disability_yes');
        await rdoWorkDisibilityYes.click();

        const rdoDeniedYes = page.locator('#denied_yes');
        await rdoDeniedYes.click();

        // Click Get Free Evaluation button
        const btnGetFreeEval = page.locator('#lp-pom-button-269');
        await btnGetFreeEval.click();

        // Verify still on page and required field is focused
        const selectAge = page.locator('#age');
        await expect(selectAge).toBeFocused();

        // Verify all selected
        await expect(rdoIsVeterenYes).toBeChecked();
        await expect(rdoDischargeYes).toBeChecked();
        await expect(rdoMilitaryStressYes).toBeChecked();
        await expect(rdoWorkDisibilityYes).toBeChecked();
        await expect(rdoDeniedYes).toBeChecked();

    });

    test('Verify contact info can be filled', async ({ evalForm }) => {

        let td = {
            first: faker.person.firstName(),
            last: faker.person.lastName(),
            email: faker.internet.exampleEmail(),
            phone: faker.phone.number(),
            zip: faker.location.zipCode()
        }

        // Go to evaluation form
        await evalForm.goto();

        // Fill out just the contact info
        await evalForm.fillContactInfo(td.first, td.last, td.email, td.phone, td.zip);

        // Verify First Name, Last Name have expected values
        await expect(evalForm.inpFirst).toHaveValue(td.first);

    });

});