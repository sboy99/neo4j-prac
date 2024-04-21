import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { config } from "@/config";
import { TMoralisEvmStream, TMoralisEvmStreamOptions } from "@/types";

// -------------------------------PUBLIC--------------------------------- //

export function StartMoralis() {
  Moralis.start({
    apiKey: config.MORALIS_API_KEY,
  });
}

export async function StartStreaming() {
  const walletAddress = "0xa4e6D09f17CcfA7DD50D1811627F5FE7d90A327c";

  const options = getMoralisStreamOptions();
  const stream = await getMoralisStream(options);
  const streamId = getStreamId(stream);
  await addAddressToStream(streamId, walletAddress);
  printSuccessMessage();
}

// -------------------------------PRIVATE--------------------------------- //

function getMoralisStreamOptions(): TMoralisEvmStreamOptions {
  return {
    chains: [EvmChain.SEPOLIA],
    tag: "transfers",
    description: "Listen to Transfers",
    includeContractLogs: false,
    includeNativeTxs: true,
    webhookUrl: config.MORALIS_WEBHOOK_URL,
  };
}

async function getMoralisStream(
  options: TMoralisEvmStreamOptions
): Promise<TMoralisEvmStream> {
  const stream = await Moralis.Streams.add(options);
  return stream;
}

function getStreamId(stream: TMoralisEvmStream): string {
  const { id } = stream.toJSON();
  return id;
}

async function addAddressToStream(
  streamId: string,
  walletAddress: string
): Promise<void> {
  await Moralis.Streams.addAddress({ id: streamId, address: walletAddress });
}

function printSuccessMessage() {
  console.log("Stream Created Successfully!");
}
