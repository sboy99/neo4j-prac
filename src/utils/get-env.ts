import { TConfigKeys } from "@/types/global";

export function getEnv(key: TConfigKeys): string {
  const value = process.env?.[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found`);
  }
  return value;
}

export function getEnvInt(key: TConfigKeys): number {
  return parseInt(getEnv(key), 10);
}
