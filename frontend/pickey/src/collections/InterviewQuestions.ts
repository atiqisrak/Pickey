import { CollectionConfig } from 'payload/types'

const InterviewQuestions: CollectionConfig = {
  slug: 'interview_questions',
  labels: {
    singular: 'Interview Question',
    plural: 'Interview Questions',
  },
  fields: [
    {
      name: 'question',
      label: 'Question',
      type: 'text',
      required: true,
    },
    // stack, tag, hardness
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'difficulty',
      label: 'Difficulty',
      type: 'number',
      required: true,
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'answers',
      label: 'Answers',
      type: 'array',
      fields: [
        {
          name: 'answer',
          label: 'Answer',
          type: 'text',
          required: true,
        },
        {
          name: 'correct',
          label: 'Correct',
          type: 'checkbox',
          required: true,
        },
      ],
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Multiple Choice',
          value: 'multiple_choice',
        },
      ],
      required: true,
    },
    {
      name: 'options',
      label: 'Options',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Value',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.type === 'multiple_choice',
      },
    },
  ],
}

export default InterviewQuestions