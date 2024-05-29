import { getEnv, getEnvInt } from "@/utils/get-env";
import { TConfig } from "@/types/global";
import * as dotenv from "dotenv";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// -------------------------------PUBLIC--------------------------------- //

export const config: TConfig = {
  NODE_ENV: getEnv("NODE_ENV"),
  NEO4J_URI: getEnv("NEO4J_URI"),
  NEO4J_USERNAME: getEnv("NEO4J_USERNAME"),
  NEO4J_PASSWORD: getEnv("NEO4J_PASSWORD"),
};
