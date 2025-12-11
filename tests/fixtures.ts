import { test as base, expect, Page } from "@playwright/test";

export type Fixtures = {
  page: Page;
};

export const test = base.extend<Fixtures>({});
export { expect };

