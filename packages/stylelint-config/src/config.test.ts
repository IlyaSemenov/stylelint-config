import { expect, it } from "vitest"

import { defineConfig } from "./config"

it("generates something", () => {
  expect(defineConfig()).toBeTruthy()
})
