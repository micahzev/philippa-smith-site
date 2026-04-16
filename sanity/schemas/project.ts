import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project (Carousel)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      description: 'The title shown above the carousel.',
      type: 'string',
      validation: (R) => R.required().max(120),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description:
        'Lower numbers appear first on the page. Use increments of 10 (10, 20, 30…) so you have room to insert between them later.',
      type: 'number',
      initialValue: 10,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'visible',
      title: 'Show on site',
      description: 'Toggle off to hide this project without deleting it.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'works',
      title: 'Works in this project',
      description:
        'Drag to reorder. Works are shown in this order inside the carousel.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'work'}]}],
      options: {
        // Native drag handles for reordering
      },
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      visible: 'visible',
      worksCount: 'works.length',
    },
    prepare({title, order, visible, worksCount}) {
      return {
        title: `${title || 'Untitled project'}`,
        subtitle: `${visible ? '● visible' : '○ hidden'}  ·  order ${order ?? '—'}  ·  ${worksCount || 0} work${worksCount === 1 ? '' : 's'}`,
      }
    },
  },
})
