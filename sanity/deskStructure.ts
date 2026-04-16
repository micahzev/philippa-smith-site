import type {StructureResolver} from 'sanity/structure'

/**
 * Shows Projects ordered by their manual `order` field so admins
 * see them in the exact sequence visitors see on the site.
 * Use the orderable-document-list plugin (optional) for drag-reorder,
 * or just edit the Order number on each project.
 */
export const myStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Projects (in display order)')
        .child(
          S.documentTypeList('project')
            .title('Projects')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('All Works')
        .child(S.documentTypeList('work').title('All Works')),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
    ])
