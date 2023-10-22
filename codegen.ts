import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/admin-api',
  documents: './src/plugins/**/*.graphql',
  generates: {
    './src/plugins/banner-plugin/ui/graphql-operations.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
