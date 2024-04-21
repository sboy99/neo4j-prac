import Moralis from "moralis";

export type TMoralisEvmStreamOptions = Parameters<
  typeof Moralis.Streams.add
>[0];

export type TMoralisEvmStream = Awaited<ReturnType<typeof Moralis.Streams.add>>;
