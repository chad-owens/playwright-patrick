import { Locator, Page } from '@playwright/test';

export class EvaluationForm {
    page: Page;
    btnStartEvaluation: Locator;
    inpFirst: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btnStartEvaluation = page.getByText('Start Your Evaluation');
        this.inpFirst = this.page.locator('#first_name')
    }

    /**
     * Go to evaluation form
     */
    async goto() {
        await this.page.goto('https://veterans.trajectormedical.com');
    }

    /**
     * Fill out contact info
     * @param {string} first
     * @param {string} last
     * @param {string} email
     * @param {string} phone
     * @param {string} zip
     */
    async fillContactInfo(first: string, last: string, email: string, phone: string, zip: string) {
        // Fill out contact form fields
        await this.inpFirst.fill(first);
        const inpLast = this.page.locator('#last_name');
        await inpLast.fill(last);
        const inpEmail = this.page.locator('#email_address');
        await inpEmail.fill(email);
        const inpPhone = this.page.locator('#phone_home');
        await inpPhone.fill(phone);
        const inpZip = this.page.locator('#zip_code');
        await inpZip.fill(zip);

    }

}