import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: '.env.local', })

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!, // Use non-null assertion to ensure TypeScript treats it as a string
  },
  schema: './server/schema.ts',
  out: './server/migrations',
});
