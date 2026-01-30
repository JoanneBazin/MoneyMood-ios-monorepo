import { test as baseTest } from "@playwright/test";
import { createUserInDB, deleteUserFromDB } from "helpers/db-helpers";

export * from "@playwright/test";

export const test = baseTest.extend<
  {},
  { user: { email: string; password: string; name: string; id: string } }
>({
  user: [
    async ({}, use) => {
      const workerIndex = test.info().workerIndex;
      const testUser = {
        name: `User Worker ${workerIndex}`,
        email: `user-${workerIndex}@test.com`,
        password: "Password1234",
      };

      console.log(`🔧 Création user DB pour worker ${workerIndex}`);
      const user = await createUserInDB(
        testUser.name,
        testUser.email,
        testUser.password,
      );

      await use({ ...testUser, id: user.id });

      console.log(`🧹 Suppression user: ${testUser.email}`);
      await deleteUserFromDB(testUser.email);
    },
    { scope: "worker" },
  ],
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      localStorage.clear();
      sessionStorage.clear();
      sessionStorage.setItem("playwright-test", "true");
    });

    await use(page);
  },
});
