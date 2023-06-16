import { test as base } from '@playwright/test';
import { EvaluationForm } from './evaluation';

// Declare the types
type MyFixtures = {
    evalForm: EvaluationForm;
};

// Extend base tests and add page objects
export const test = base.extend<MyFixtures>({

    evalForm: async ({ page }, use) => {
        await use(new EvaluationForm(page));
    }

});

export { expect } from '@playwright/test';