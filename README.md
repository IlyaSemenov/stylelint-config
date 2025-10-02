# @ilyasemenov/stylelint-config

A reusable Stylelint configuration for projects I develop or oversee.

Recommended to use alongside [@ilyasemenov/eslint-config](https://github.com/IlyaSemenov/eslint-config).

## Setup

Install:

```sh
pnpm add -D stylelint @ilyasemenov/stylelint-config
```

Create `stylelint.config.js`:

```js
// @ts-check

import { defineConfig } from "@ilyasemenov/stylelint-config"

export default defineConfig()
```

Available options:

```js
export default defineConfig({
  // Add SCSS rules.
  scss: true,

  // Add Vue rules (either CSS or SCSS).
  vue: true,

  // Add Tailwind CSS rules.
  tailwind: true,

  // Use tabs for indentation.
  tabs: true,

  // Use single quotes.
  quotes: "single",

  // ...and all stylelint options.
})
```

## Command line script

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint --fix . && stylelint --fix '**/*.{css,scss,vue}'"
  }
}
```

and run:

```sh
pnpm lint
```

## Setup lint-staged

Create `lint-staged.config.js`:

```js
export default {
  "*.{cjs,js,ts,json,md,yaml,toml}": "eslint --fix",
  "*.{css,scss}": "stylelint --fix",
  "*.vue": ["eslint --fix", "stylelint --fix"],
}
```
