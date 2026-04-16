import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — we only ever create one instance (id: 'siteSettings')
  fields: [
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Shown at the bottom of the site as the contact address.',
      validation: (R) =>
        R.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {name: 'email', invert: false}).error(
          'Please enter a valid email address',
        ),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Site Meta Description',
      type: 'text',
      rows: 3,
      description: 'Used in search results and social shares (140–160 characters ideal).',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
