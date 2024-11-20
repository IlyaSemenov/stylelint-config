This is a set of reusable linter configs that I use in the projects that I develop or supervise:

- For `eslint`, extends [@antfu/eslint-config](https://github.com/antfu/eslint-config).
- For `stylelint`.

## Setup ESLint

Install:

```sh
pnpm add -D eslint @ilyasemenov/eslint-config
```

Create `eslint.config.js`:

```js
import { defineConfig } from "@ilyasemenov/eslint-config"

export default defineConfig()
```

Available options:

```js
export default defineConfig({
  // Lint Vue. Unlike antfu, must be enabled explicitly.
  vue: true,

  // Lint pug in Vue templates.
  vuePug: true,

  // ...and all @antfu/eslint-config options.
})
```

## Setup Stylelint

Install:

```sh
pnpm add -D stylelint @ilyasemenov/stylelint-config
```

Create `stylelint.config.js`:

```js
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
