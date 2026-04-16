import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {myStructure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Philippa Smith — Studio',

  // Fill these in after running `sanity init` (or from sanity.io/manage)
  projectId: 'tdp5nb3h',
  dataset: 'production',

  plugins: [
    structureTool({structure: myStructure}),
    visionTool(), // GROQ playground for admins who want to inspect data
  ],

  schema: {
    types: schemaTypes,
  },

  // Make admins land on Projects view (ordered)
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      return prev.filter((item) => item.templateId !== 'media.tag')
    },
  },
})
