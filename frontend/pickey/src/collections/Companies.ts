import { CollectionConfig } from 'payload/types'

const Companies: CollectionConfig = {
  slug: 'companies',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'uploads',
    },
    {
      name: 'website',
      label: 'Website',
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
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
    },
    {
      name: 'jobs',
      label: 'Jobs',
      type: 'relationship',
      relationTo: 'jobs',
      hasMany: true,
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
  ],
}

export default Companies