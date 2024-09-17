import { antfu } from "@antfu/eslint-config"
import vuePug from "eslint-plugin-vue-pug"

// TODO: add more options / proxy antfu options as needed.
export interface EslintOptions {
  vue?: boolean
  vuePug?: boolean
}

// Workaround for error TS2742:
// The inferred type of 'defineEslintConfig' cannot be named without a reference to '.pnpm/eslint-flat-config-utils@0.3.1/node_modules/eslint-flat-config-utils'.
// This is likely not portable. A type annotation is necessary.
export type FlatConfigComposer = ReturnType<typeof antfu>

// TODO: add antfu-style ...args chaining as needed.
export function defineEslintConfig(opts?: EslintOptions): FlatConfigComposer {
  const fullOpts = {
    vue: false,
    vuePug: false,
    ...opts,
  }

  if (!fullOpts.vue && fullOpts.vuePug) {
    throw new Error(`"vuePug" option requires "vue" option to be enabled.`)
  }

  const composer = antfu({
    vue: fullOpts.vue,
    stylistic: {
      quotes: "double",
    },
    rules: {
      // always add if { ... } braces
      "curly": ["error", "all"],
      // allow console.log
      "no-console": "warn",
      // allow arrays [, a]
      "no-sparse-arrays": "off",
      // allow string + string
      "prefer-template": "off",
      "perfectionist/sort-imports": ["error", {
        groups: [
          ["builtin", "builtin-type"],
          ["external", "external-type"],
          ["internal", "internal-type"],
          ["parent", "parent-type"],
          ["sibling", "sibling-type", "index", "index-type"],
          "unknown",
        ],
        newlinesBetween: "always",
        // For Nuxt.
        internalPattern: ["~/**", "@/**", "#**"],
        order: "asc",
        type: "natural",
      }],
      "perfectionist/sort-named-imports": ["error", {
        ignoreAlias: true,
      }],
      // put if { at one line
      "style/brace-style": ["error", "1tbs"],
      // allow both it() and test()
      "test/consistent-test-it": "off",
      // allow @ts-ignore
      "ts/ban-ts-comment": "off",
      // allow types instead of interfaces
      "ts/consistent-type-definitions": "off",
      // allow interace method as arrow fn
      "ts/method-signature-style": "off",
    },
  })

  if (fullOpts.vue) {
    composer.override("antfu/vue/rules", {
      rules: {
        // <component-name>
        "vue/component-name-in-template-casing": ["error", "kebab-case", {
          registeredComponentsOnly: false,
        }],
        // allow v-for without :key
        "vue/require-v-for-key": "off",
      },
    })

    if (fullOpts.vuePug) {
      composer.override("antfu/vue/setup", {
        plugins: {
          "vue-pug": vuePug,
        },
      })
      composer.override("antfu/vue/rules", (t) => {
        t.languageOptions!.parserOptions!.templateTokenizer = {
          pug: "vue-eslint-parser-template-tokenizer-pug",
        }
        return t
      })
      composer.override("antfu/vue/rules", {
        rules: {
          // base
          "vue/component-name-in-template-casing": "off",
          "vue/html-self-closing": "off",
          "vue/html-end-tags": "off",
          "vue/html-indent": "off",
          "vue/multiline-html-element-content-newline": "off",
          "vue/singleline-html-element-content-newline": "off",
          // vue3-essential
          "vue-pug/no-parsing-error": "error",
          // vue3-strongly-recommended
          "vue-pug/no-pug-control-flow": "warn",
        },
      })
    }
  }

  return composer
}
