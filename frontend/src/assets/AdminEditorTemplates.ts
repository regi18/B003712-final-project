import type { CoreEditorTemplateItem } from '@/interfaces/CoreEditor';

export default {
  // Editor template for articles
  article: [
    {
      type: 'input',
      title: 'Slug',
      key: 'slug',
    },
    {
      type: 'input',
      title: 'Title',
      key: 'title',
    },
    {
      type: 'select',
      key: 'section',
      title: 'Section',
      options: [],
    },
    {
      title: 'Author',
      type: 'input',
      key: 'author',
    },
    {
      title: 'Issue No.',
      type: 'number',
      key: 'issueNumber',
    },
    {
      title: 'Content (markdown)',
      type: 'textarea',
      key: 'content',
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
    },
    {
      title: 'Image',
      type: 'file',
      mime: 'image/*',
      key: 'img',
    },
  ],
  // Editor template for paper issues
  paperIssue: [
    {
      type: 'input',
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Paper (pdf)',
      type: 'file',
      mime: 'application/pdf',
      key: 'img',
    },
  ],
  section: [
    {
      type: 'input',
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Slug',
      type: 'input',
      key: 'slug',
    }
  ]
} as Record<string, CoreEditorTemplateItem[]>;
