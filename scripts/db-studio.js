const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// Set the environment variable for drizzle-kit
process.env.DATABASE_URL = process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

// Run drizzle-kit studio
try {
  console.log('Starting Drizzle Studio...');
  execSync('npx drizzle-kit studio --host localhost', { stdio: 'inherit' });
} catch (error) {
  console.error('Error starting Drizzle Studio:', error.message);
  process.exit(1);
}
