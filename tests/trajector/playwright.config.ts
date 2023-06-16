import { defineConfig, devices } from '@playwright/test';
import baseConfig from '../../playwright.config';

export default defineConfig({
    ...baseConfig,
    projects: [
        {
            name: 'smoke',
            testDir: '../../tests/trajector/smoke',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'mobile',
            testDir: '../../tests/trajector/smoke',
            use: { ...devices['iPhone 12'] }
        }
    ]
});