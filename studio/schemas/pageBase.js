import asyncSlugifier from "../lib/asyncSlugifier"

export default {
  name: 'pageBase',
  title: 'Page base',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc, options) => ({ doc, options }),
        slugify: asyncSlugifier
      }
    },
    {
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [
        // list all desired page types
        { type: 'modularPage' },
      ],
    },
  ],
}
