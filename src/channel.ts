import { randomUUID } from "crypto";
import { Neo4j } from "./neo4j";

export class ChannelRepo {
  constructor(private readonly neo4j: Neo4j) {}

  async createChannel(name: string) {
    const id = randomUUID();
    const createdAt = new Date();

    await this.neo4j.createNode("CHANNEL", {
      id,
      name,
      createdAt,
    });
  }
}
