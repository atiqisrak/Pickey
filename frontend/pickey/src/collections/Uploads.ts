import { CollectionConfig } from 'payload/types'

const Uploads: CollectionConfig = {
  slug: 'uploads',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      required: true,
    },
    {
      name: 'size',
      label: 'Size',
      type: 'number',
      required: true,
    },
    {
      name: 'mime_type',
      label: 'MIME Type',
      type: 'text',
      required: true,
    },
  ],
}

export default Uploads