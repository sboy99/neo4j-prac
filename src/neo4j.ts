import neo4j, { Driver, QueryResult, RecordShape, Session } from "neo4j-driver";
import { config } from "./config";
import { Neo4jLabels, NeoProperties } from "./types/global";
import { stringifyDates } from "./utils/serialize-property";

export class Neo4j {
  private driver: Driver;

  constructor() {
    this.driver = neo4j.driver(
      config.NEO4J_URI,
      neo4j.auth.basic(config.NEO4J_USERNAME, config.NEO4J_PASSWORD)
    );
  }

  async connect() {
    const session = this.driver.session();
    try {
      const result = await session.run("RETURN 1");
      console.log("Neo4j connected:", result.records[0].get(0));
    } catch (error) {
      console.error("Neo4j connection error:", error);
    } finally {
      await session.close();
    }
  }

  async disconnect() {
    await this.driver.close();
    console.log("Neo4j disconnected");
  }

  async createNode<T extends Neo4jLabels>(
    label: T,
    properties: NeoProperties<T>
  ) {
    const session = this.driver.session();

    try {
      const result = await session.run(
        `CREATE (n:${label} $properties) RETURN n`,
        { properties: stringifyDates(properties) }
      );
      console.log("Node created:", result.records[0].get("n"));
    } catch (error) {
      console.error("Error creating node:", error);
    } finally {
      await session.close();
    }
  }

  async getNode<T extends Neo4jLabels, U extends keyof NeoProperties<T>>(
    label: T,
    property: U,
    value: NeoProperties<T>[U]
  ) {
    const session = this.driver.session();
    try {
      const result = await session.run(
        `MATCH (n:${label} {${property as string}: $value}) RETURN n`,
        { value }
      );
      console.log("Node retrieved:", result.records[0].get("n"));
    } catch (error) {
      console.error("Error retrieving node:", error);
    } finally {
      await session.close();
    }
  }

  async query(
    qry: Parameters<Session["run"]>["0"],
    params?: Parameters<Session["run"]>["1"]
  ): Promise<QueryResult<RecordShape>> {
    const session = this.driver.session();
    try {
      const result = await session.run(qry, params);
      console.log("Query result:", result.records);
      return result;
    } catch (error) {
      console.error("Error running query:", error);
    } finally {
      await session.close();
    }
  }
}
