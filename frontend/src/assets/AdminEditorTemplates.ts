import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';

export default {
  // Editor template for articles
  article: [
    {
      type: 'input',
      title: 'Slug',
      key: 'slug',
      required: true,
    },
    {
      type: 'input',
      title: 'Title',
      key: 'title',
      required: true,
    },
    {
      type: 'select',
      key: 'section',
      title: 'Section',
      options: [],
      required: true,
    },
    {
      title: 'Author',
      type: 'input',
      key: 'author',
      required: true,
    },
    {
      title: 'Issue No.',
      type: 'number',
      key: 'issueNumber',
      required: true,
    },
    {
      title: 'Content (markdown)',
      type: 'textarea',
      key: 'content',
      required: true,
    },
    {
      title: 'Image',
      key: 'img',
      type: 'file',
      mime: 'image/*',
    },
  ],
  // Editor template for cartoons
  cartoon: [
    {
      type: 'input',
      title: 'Title',
      key: 'title',
      required: true,
    },
    {
      title: 'Image',
      type: 'file',
      mime: 'image/*',
      key: 'img',
      required: true,
    },
  ],
  // Editor template for paper issues
  paperIssue: [
    {
      type: 'number',
      title: 'Issue No.',
      key: 'issueNumber',
      required: true,
    },
    {
      title: 'Paper (pdf)',
      type: 'file',
      mime: 'application/pdf',
      key: 'pdf',
      required: true,
    },
  ],
  section: [
    {
      type: 'input',
      title: 'Title',
      key: 'title',
      required: true,
    },
    {
      title: 'Slug',
      type: 'input',
      key: 'slug',
      required: true,
    }
  ]
} as Record<string, CoreEditorTemplateItem[]>;
