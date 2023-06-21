import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    foo: 'bar',
    baz: 'quux',
  },
})