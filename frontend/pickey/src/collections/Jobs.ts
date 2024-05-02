import { CollectionConfig } from 'payload/types'

const Jobs: CollectionConfig = {
  slug: 'jobs',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
      required: true,
    },
    // responsibilities, qualifications, offerings from company, etc.
    {
      name: 'responsibilities',
      label: 'Responsibilities',
      type: 'richText',
      required: true,
    },
    {
      name: 'qualifications',
      label: 'Qualifications',
      type: 'richText',
      required: true,
    },
    {
      name: 'company_offerings',
      label: 'Company Offerings',
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
      name: 'salary',
      label: 'Salary',
      type: 'number',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'relationship',
      relationTo: 'companies',
      required: true,
    },
    {
      name: 'applicants',
      label: 'Applicants',
      type: 'relationship',
      relationTo: 'applicants',
      hasMany: true,
    },
  ],
}

export default Jobs