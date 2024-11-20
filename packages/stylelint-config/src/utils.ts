import { createRequire } from "node:module"

// Note: needs shim: true in tsup config for CJS build.
export const esmCjsCompatRequire = createRequire(import.meta.url)
