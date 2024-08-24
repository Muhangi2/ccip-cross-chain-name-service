import * as dotenvenc from "@chainlink/env-enc";
dotenvenc.config();

import { HardhatUserConfig, extendEnvironment } from "hardhat/config";
import { createProvider } from "hardhat/internal/core/providers/construction";
import "@nomicfoundation/hardhat-toolbox";
import './tasks'; // Custom Hardhat tasks

const {
  ETHEREUM_SEPOLIA_RPC_URL,
  POLYGON_AMOY_RPC_URL,
  OPTIMISM_SEPOLIA_RPC_URL,
  ARBITRUM_SEPOLIA_RPC_URL,
  AVALANCHE_FUJI_RPC_URL,
  BNB_CHAIN_TESTNET_RPC_URL,
  BASE_SEPOLIA_RPC_URL,
  KROMA_SEPOLIA_RPC_URL,
  WEMIX_TESTNET_RPC_URL,
  GNOSIS_CHIADO_RPC_URL,
  CELO_ALFAJORES_RPC_URL,
  PRIVATE_KEY
} = process.env;

// Extend Hardhat environment with custom function
// extendEnvironment(async (hre) => {
//   hre.changeNetwork = async function changeNetwork(newNetwork: string) {
//     hre.network.name = newNetwork;
//     hre.network.config = hre.config.networks[newNetwork];
//     hre.ethers.provider = new hre.ethers.providers.JsonRpcProvider(hre.network.config.url);
//     hre.network.provider = await createProvider(hre.config, newNetwork);
//   }
// });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat", // Default to Hardhat network
  networks: {
    hardhat: {
      chainId: 31337 // Chain ID for Hardhat Network
    },
    ethereumSepolia: {
      url: ETHEREUM_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    polygonAmoy: {
      url: POLYGON_AMOY_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 80002
    },
    optimismSepolia: {
      url: OPTIMISM_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155420
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 421614
    },
    avalancheFuji: {
      url: AVALANCHE_FUJI_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 43113
    },
    bnbChainTestnet: {
      url: BNB_CHAIN_TESTNET_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 97
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 84532
    },
    kromaSepolia: {
      url: KROMA_SEPOLIA_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 2358
    },
    wemixTestnet: {
      url: WEMIX_TESTNET_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 1112
    },
    gnosisChiado: {
      url: GNOSIS_CHIADO_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 10200
    },
    celoAlfajores: {
      url: CELO_ALFAJORES_RPC_URL || '',
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 44787
    }
  }
};

export default config;
