import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

config({ path: path.resolve(__dirname, ".env.development.local") });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
