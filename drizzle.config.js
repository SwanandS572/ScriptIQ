const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  schema: "./utils/schema.tsx",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_CLdpNxcmBb57@ep-solitary-violet-a1j9b7cf-pooler.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require'
  }
});
