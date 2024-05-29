import { randomUUID } from "crypto";
import { Neo4j } from "./neo4j";
import { Neo4jLabels } from "./types/global";
import { stringifyDates } from "./utils/serialize-property";

type MessagedToUserMeta = {
  count: number;
  lastMessagedAt: Date;
};

export class UsersRepo {
  private readonly label: Neo4jLabels = "USER";

  constructor(private readonly neo4j: Neo4j) {}

  async createUser(name: string, username: string) {
    const id = randomUUID();
    const createdAt = new Date();
    const joinedAt = new Date();

    await this.neo4j.createNode("USER", {
      id,
      name,
      username,
      createdAt,
      joinedAt,
    });
  }

  async doesUserExist(userId: string) {
    const res = this.neo4j.query(`MATCH (u:${this.label} {id: $userId}) RETURN u`,{userId});
   return !!res
  }

  async messagedToUser(
    myId: string,
    userId: string,
    metadata: MessagedToUserMeta
  ) {
    const relationship = "MESSAGED_TO";
    await this.neo4j.query(
      `MATCH (u1:${this.label} {id: $myId}), (u2:${this.label} {id: $userId})
       CREATE (u1)-[:${relationship} {metadata: $metadata}]->(u2)`,
      { myId, userId, metadata: stringifyDates(metadata) }
    );
  }
}
