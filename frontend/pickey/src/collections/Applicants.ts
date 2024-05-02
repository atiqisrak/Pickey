import { CollectionConfig } from 'payload/types'

const Applicants: CollectionConfig = {
    slug: 'applicants',
    fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: true,
        },
        {
          name: 'resume',
          label: 'Resume',
          type: 'upload',
          relationTo: 'uploads',
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
          name: 'location',
          label: 'Location',
          type: 'text',
          required: true,
        },
        {
          name: 'work_experience',
          label: 'Work Experience',
          type: 'richText',
          required: true,
        },
        {
          name: 'current_salary',
          label: 'Current Salary',
          type: 'number',
          required: true,
        },
        {
          name: 'expected_salary',
          label: 'Expected Salary',
          type: 'number',
          required: true,
        },
        {
          name: 'social_media_links',
          label: 'Social Media Links',
          type: 'array',
          fields: [
            {
              name: 'link',
              label: 'Link',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'type_of_employment',
          label: 'Type of Employment',
          type: 'select',
          options: [
            {
              label: 'Full_time',
              value: 'full_time',
            },
            {
              label: 'Part_time',
              value: 'part_time',
            },
            {
              label: 'Contract',
              value: 'contract',
            },
            {
              label: 'Freelance',
              value: 'freelance',
            },
            {
              label: 'Internship',
              value: 'internship',
            },
          ],
          required: true,
        },
        {
          name: 'languages',
          label: 'Languages',
          type: 'array',
          fields: [
            {
              name: 'language',
              label: 'Language',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'education',
          label: 'Education',
          type: 'richText',
          required: true,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'array',
          fields: [
            {
              name: 'skill',
              label: 'Skill',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'certifications',
          label: 'Certifications',
          type: 'array',
          fields: [
            {
              name: 'certification',
              label: 'Certification',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'hobbies',
          label: 'Hobbies',
          type: 'array',
          fields: [
            {
              name: 'hobby',
              label: 'Hobby',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'references',
          label: 'References',
          type: 'array',
          fields: [
            {
              name: 'name',
              label: 'Name',
              type: 'text',
              required: true,
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              required: true,
            },
            {
              name: 'phone',
              label: 'Phone',
              type: 'text',
              required: true,
            },
            {
              name: 'relation',
              label: 'Relation',
              type: 'text',
              required: true,
            },
          ],
        },
      ]
}

export default Applicants