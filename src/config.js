import { config } from "dotenv";

config();

export const MONGODB_URI =
  process.env.MONGODB_URI || ""; // votre mongodb_uri ICI
