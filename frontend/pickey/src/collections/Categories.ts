import { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'text',
      required: true,
    },
  ],
}

export default Categories