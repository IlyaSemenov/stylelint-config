import { expect, it, test } from "vitest"

import { defineConfig } from "./config"

test("css, no vue", () => {
  const config = defineConfig()
  expect(config.extends).toEqual([
    expect.stringContaining("stylelint-config-standard"),
    expect.stringContaining("@stylistic/stylelint-config"),
  ])
})

test("css, vue", () => {
  const config = defineConfig({ vue: true })
  expect(config.extends).toEqual([
    expect.stringContaining("stylelint-config-standard"),
    expect.stringContaining("stylelint-config-standard-vue"),
    expect.stringContaining("@stylistic/stylelint-config"),
  ])
})

test("scss, no vue", () => {
  const config = defineConfig({ scss: true })
  expect(config.extends).toEqual([
    expect.stringContaining("stylelint-config-standard-scss"),
    expect.stringContaining("@stylistic/stylelint-config"),
  ])
})

test("scss, vue", () => {
  const config = defineConfig({ scss: true, vue: true })
  expect(config.extends).toEqual([
    expect.stringContaining("stylelint-config-standard-scss"),
    expect.stringContaining("stylelint-config-standard-vue/scss"),
    expect.stringContaining("@stylistic/stylelint-config"),
  ])
})

test("tailwind", () => {
  const config = defineConfig({ tailwind: true })
  expect(config.extends).toEqual([
    expect.stringContaining("stylelint-config-standard"),
    expect.stringContaining("stylelint-config-tailwindcss"),
    expect.stringContaining("@stylistic/stylelint-config"),
  ])
})

it("does not include SCSS rules when scss: false", () => {
  const config = defineConfig({ scss: false })
  expect(config.rules).not.toHaveProperty("scss/at-mixin-pattern")
  expect(config.rules).not.toHaveProperty("scss/at-rule-conditional-no-parentheses")
  expect(config.rules).not.toHaveProperty("scss/comment-no-empty")
  expect(config.rules).not.toHaveProperty("scss/load-no-partial-leading-underscore")
})

it("includes SCSS rules when scss: true", () => {
  const config = defineConfig({ scss: true })
  expect(config.rules).toHaveProperty("scss/at-mixin-pattern")
  expect(config.rules).toHaveProperty("scss/at-rule-conditional-no-parentheses")
  expect(config.rules).toHaveProperty("scss/comment-no-empty")
  expect(config.rules).toHaveProperty("scss/load-no-partial-leading-underscore")
})
