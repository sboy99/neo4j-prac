export type TConfig = {
  NODE_ENV: string;
  NEO4J_URI: string;
  NEO4J_USERNAME: string;
  NEO4J_PASSWORD: string;
};

export type TConfigKeys = keyof TConfig;
export type Neo4jLabels = "USER" | "GROUP" | "CHANNEL";

export type NeoUser = {
  id: string;
  name: string;
  username: string;
  createdAt: Date;
  joinedAt: Date;
};

export type NeoGroup = {
  id: string;
  name: string;
  createdAt: Date;
};

export type NeoChannel = {
  id: string;
  name: string;
  createdAt: Date;
};

export type NeoProperties<T extends Neo4jLabels> = {
  USER: NeoUser;
  GROUP: NeoGroup;
  CHANNEL: NeoChannel;
}[T];
