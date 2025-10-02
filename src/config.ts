import type { Config } from "stylelint"

import { esmCjsCompatRequire } from "./utils"

export interface StylelintOptions extends Config {
  /**
   * Add SCSS rules.
   *
   * @default false
   */
  scss?: boolean
  /**
   * Add Vue rules.
   *
   * @default false
   */
  vue?: boolean
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

export function defineConfig(config: StylelintOptions = {}): Config {
  const {
    scss = false,
    vue = false,
    tabs = false,
    quotes,
    extends: configExtends,
    rules,
    ...stylelintConfig
  } = config

  const allExtends = [
    // Use dynamic require, because these plugins are dependencies of lint-config and not user package.
    // With pnpm, they will not be available in userland, and VS Code Stylelint plugin will break.
    ...(scss
      ? [esmCjsCompatRequire.resolve("stylelint-config-standard-scss")]
      : [esmCjsCompatRequire.resolve("stylelint-config-standard")]
    ),
    ...(vue
      ? scss
        ? [esmCjsCompatRequire.resolve("stylelint-config-standard-vue/scss")]
        : [esmCjsCompatRequire.resolve("stylelint-config-standard-vue")]
      : []
    ),
    esmCjsCompatRequire.resolve("@stylistic/stylelint-config"),
    ...(configExtends ?? []),
  ]

  return {
    ...stylelintConfig,
    extends: allExtends,
    rules: {
      // allow style="color: red"
      "@stylistic/declaration-block-trailing-semicolon": ["always", { ignore: "single-declaration" }],
      // allow clip-path: polygon(<multiline code>)
      "@stylistic/declaration-colon-newline-after": null,
      // don't limit line length
      "@stylistic/max-line-length": null,
      // don't add empty line before @include
      "at-rule-empty-line-before": null,
      // allow #0033ff
      "color-hex-length": null,
      // allow non-kebab-case --vars
      "custom-property-pattern": null,
      // allow findInvertColor
      "function-name-case": null,
      // allow @include followed by class, TODO: improve
      "declaration-empty-line-before": null,
      // allow @import in the middle of SCSS, TODO: improve
      "no-invalid-position-at-import-rule": null,
      // allow non-kebab-case class names such as _modifier
      "selector-class-pattern": null,
      // allow external #weirdId
      "selector-id-pattern": null,
      ...(scss
        ? {
            // allow non-kebab-case mixin names, TODO: rename mixins
            "scss/at-mixin-pattern": null,
            // require @if (brackets)
            "scss/at-rule-conditional-no-parentheses": null,
            // allow empty comment headers
            "scss/comment-no-empty": null,
            // allow SCSS partials, TODO: rename partials
            "scss/load-no-partial-leading-underscore": null,
          }
        : undefined),
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
