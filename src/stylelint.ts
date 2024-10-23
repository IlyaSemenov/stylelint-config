import type { Config } from "stylelint"

import { esmCjsCompatRequire } from "./utils"

export interface StylelintOptions extends Config {
  /**
   * Use tabs for indentation.
   *
   * @default false
   */
  tabs?: boolean
  /**
   * Use single or double quotes.
   *
   * @default undefined (use Stylelint default)
   */
  quotes?: "single" | "double"
}

export function defineStylelintConfig(config: StylelintOptions = {}): Config {
  const {
    tabs = false,
    quotes,
    extends: configExtends,
    rules,
    ...stylelintConfig
  } = config

  return {
    ...stylelintConfig,
    extends: [
      // Use dynamic require, because these plugins are dependencies of lint-config and not user package.
      // With pnpm, they will not be available in userland, and VS Code Stylelint plugin will break.
      esmCjsCompatRequire.resolve("stylelint-config-standard-scss"),
      esmCjsCompatRequire.resolve("stylelint-config-standard-vue/scss"),
      esmCjsCompatRequire.resolve("@stylistic/stylelint-config"),
      ...(configExtends ?? []),
    ],
    rules: {
      // don't add empty line before @include
      "at-rule-empty-line-before": null,
      // allow non-kebab-case --vars
      "custom-property-pattern": null,
      // allow @include followed by class, TODO: improve
      "declaration-empty-line-before": null,
      // allow @import in the middle of SCSS, TODO: improve
      "no-invalid-position-at-import-rule": null,
      // allow non-kebab-case mixin names, TODO: rename mixins
      "scss/at-mixin-pattern": null,
      // require @if (brackets)
      "scss/at-rule-conditional-no-parentheses": null,
      // allow empty comment headers
      "scss/comment-no-empty": null,
      // allow SCSS partials, TODO: rename partials
      "scss/load-no-partial-leading-underscore": null,
      // allow non-kebab-case class names such as _modifier
      "selector-class-pattern": null,
      ...tabs
        ? {
            "@stylistic/indentation": "tab",
          }
        : undefined,
      ...quotes
        ? {
            "@stylistic/string-quotes": quotes,
          }
        : undefined,
      ...rules,
    },
  }
}
