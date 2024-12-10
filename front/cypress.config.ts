import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://hugo-gehringer.github.io/ynov-ci-groupe/",
  },
});
