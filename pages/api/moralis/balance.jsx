import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

export default async function handler(req, res) {
  try {
    const address = req.body.address;
    const chain = EvmChain.GOERLI;

    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY,
      });
    }

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });
    return res.status(200).json(response?.result);
  } catch (e) {
    return res.status(500).json(e);
  }
}