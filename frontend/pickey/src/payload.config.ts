import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

// Importing collections
import Users from './collections/Users'
import Applicants from './collections/Applicants'
import Categories from './collections/Categories'
import Companies from './collections/Companies'
import Files from './collections/Files'
import InterviewQuestions from './collections/InterviewQuestions'
import Jobs from './collections/Jobs'
import Uploads from './collections/Uploads'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  // Collections: Users, Uploads, Companies, Applicants, Categories, Interview Questions, Jobs
  collections: [
    Users,
    Applicants,
    Categories,
    Companies,
    Files,
    InterviewQuestions,
    Jobs,
    Uploads,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
