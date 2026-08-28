import { config } from "dotenv";

// drizzle-kit's CLI does not auto-load .env.local like Next.js does,
// so we load it explicitly here for `npm run db:push` / `db:studio`.
config({ path: ".env.local" });

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DRIZZLE_DB_URL,
    }
};
