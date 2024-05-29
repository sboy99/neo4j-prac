import { randomUUID } from "crypto";
import { Neo4j } from "./neo4j";

export class GroupsRepo {
  constructor(private readonly neo4j: Neo4j) {}

  async createGroup(name: string) {
    const id = randomUUID();
    const createdAt = new Date();

    await this.neo4j.createNode("GROUP", {
      id,
      name,
      createdAt,
    });
  }
}
