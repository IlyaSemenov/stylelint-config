# @ilyasemenov/stylelint-config

This is a reusable Stylelint config that I use in the projects that I develop or supervise.

Typically should be used together with ESLint config, see [IlyaSemenov/lint-config](https://github.com/IlyaSemenov/lint-config).

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
