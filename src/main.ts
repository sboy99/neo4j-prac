import { ChannelRepo } from "./channel";
import { GroupsRepo } from "./groups";
import { Neo4j } from "./neo4j";
import { UsersRepo } from "./users";

async function main() {
  // di
  const neo4j = new Neo4j();
  const usersRepo = new UsersRepo(neo4j);
  const groupsRepo = new GroupsRepo(neo4j);
  const channelRepo = new ChannelRepo(neo4j);

  // connect to Neo4j
  await neo4j.connect();

  // create a user
  await usersRepo.messagedToUser(
    "031082ac-5211-4271-9089-c95dd76aab67",
    "bd5d631f-f377-4043-802a-8a8782b9cb5e",
    {
      count: 1,
      lastMessagedAt: new Date(),
    }
  );

  // cleanup
  await neo4j.disconnect();
}

main();

// 031082ac-5211-4271-9089-c95dd76aab67
// bd5d631f-f377-4043-802a-8a8782b9cb5e
