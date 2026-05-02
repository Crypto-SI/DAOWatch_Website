import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'A hex color code for UI theming (e.g. #6B46C1)',
      validation: (Rule) =>
        Rule.regex(/^#([0-9a-fA-F]{3}){1,2}$/).error('Must be a valid hex color'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
