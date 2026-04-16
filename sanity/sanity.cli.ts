import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tdp5nb3h',
    dataset: 'production',
  },
  /* Vite settings */
  vite: (prev) => ({
    ...prev,
  }),
})
