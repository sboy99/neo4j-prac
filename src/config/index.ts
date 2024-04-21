import { getEnv } from "@/utils";
import * as dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();
const MORALIS_API_KEY = getEnv("MORALIS_API_KEY");
const MORALIS_WEBHOOK_URL = getEnv("MORALIS_WEBHOOK_URL");

// -------------------------------PUBLIC--------------------------------- //

export const config = {
  MORALIS_API_KEY,
  MORALIS_WEBHOOK_URL,
};
