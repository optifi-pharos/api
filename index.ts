import express from "express";
import type { Request, Response } from "express";
import { ethers, ZeroAddress } from "ethers";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const rpc = process.env.RPC_URL || "";

const MOCK_DATA = [
  {
    nameToken: "DAI",
    token: "0xD1d25fc5faC3cd5EE2daFE6292C5DFC16057D4d1",
    staking: "0x0CAf83Ef2BA9242F174FCE98E30B9ceba299aaa3",
    nameProject: "StargateV3",
    chain: "Pharos Devnet",
    rpc: rpc,
  },
  {
    nameToken: "USDC",
    token: "0x0E8Ac3cc5183A243FcbA007136135A14831fDA99",
    staking: "0x5dC10711C60dd5174306aEC6Fb1c78b895C9fA5A",
    nameProject: "AaveV3",
    chain: "Pharos Devnet",
    rpc: rpc,
  },
  {
    nameToken: "USDT",
    token: "0xbF1876d7643a1d7DA52C7B8a67e7D86aeeAA12A6",
    staking: "0xD1b1954896009800dF01b197A6E8E1d98FF44ae8",
    nameProject: "CompoundV3",
    chain: "Pharos Devnet",
    rpc: rpc,
  },
  {
    nameToken: "UNI",
    token: "0x1eaC9BB63f8673906dBb75874356E33Ab7d5D780",
    staking: "0xa42A86906D3FDfFE7ccc1a4E143e5Ddd8dF0Cf83",
    nameProject: "Uniswap",
    chain: "Pharos Devnet",
    rpc: rpc,
  },
  {
    nameToken: "WETH",
    token: "0x134C06B12eA6b1c7419a08085E0de6bDA9A16dA2",
    staking: "0x6c36eD76d3FF0A7C0309aef473052b487895Fadf",
    nameProject: "UsdxMoney",
    chain: "Pharos Devnet",
    rpc: rpc,
  }
];

const MOCK_TOKEN_DATA = {
  tokens: [
    {
      id: 1,
      addressToken: "0xD1d25fc5faC3cd5EE2daFE6292C5DFC16057D4d1",
      symbol: "DAI",
      name: "DAI",
      decimals: 18,
      chain: "Pharos Devnet",
      logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040",
      priceChange24H: 0,
      tags: []
    },
    {
      id: 2,
      addressToken: "0x0E8Ac3cc5183A243FcbA007136135A14831fDA99",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      chain: "Pharos Devnet",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040",
      priceChange24H: 0,
      tags: ["STABLECOIN"]
    },
    {
      id: 3,
      addressToken: "0xbF1876d7643a1d7DA52C7B8a67e7D86aeeAA12A6",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      chain: "Pharos Devnet",
      logo: "https://images.seeklogo.com/logo-png/32/1/tether-usdt-logo-png_seeklogo-323175.png",
      priceChange24H: 0,
      tags: ["STABLECOIN"]
    },
    {
      id: 4,
      addressToken: "0x1eaC9BB63f8673906dBb75874356E33Ab7d5D780",
      symbol: "UNI",
      name: "Uniswap",
      decimals: 18,
      chain: "Pharos Devnet",
      logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=040",
      priceChange24H: 0,
      tags: []
    },
    {
      id: 5,
      addressToken: "0x134C06B12eA6b1c7419a08085E0de6bDA9A16dA2",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      chain: "Pharos Devnet",
      logo: "https://img.cryptorank.io/coins/weth1701090834118.png",
      priceChange24H: 0,
      tags: []
    }
  ]
};

const INIT_DATA = [
  {
    "idProtocol": "StargateV3_DAI",
    "addressToken": "0xD1d25fc5faC3cd5EE2daFE6292C5DFC16057D4d1",
    "addressStaking": "0x0CAf83Ef2BA9242F174FCE98E30B9ceba299aaa3",
    "nameToken": "DAI",
    "nameProject": "StargateV3",
    "chain": "Pharos Devnet",
    "apy": 25,
    "tvl": 0,
    "stablecoin": false,
    "categories": [
      "Staking"
    ],
    "logo": "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040",
    "createdAt": "2025-02-12T16:35:14.136Z",
    "updatedAt": "2025-02-12T16:35:14.136Z"
  },
  {
    "idProtocol": "AaveV3_USDC",
    "addressToken": "0x0E8Ac3cc5183A243FcbA007136135A14831fDA99",
    "addressStaking": "0x5dC10711C60dd5174306aEC6Fb1c78b895C9fA5A",
    "nameToken": "USDC",
    "nameProject": "AaveV3",
    "chain": "Pharos Devnet",
    "apy": 30,
    "tvl": 0,
    "stablecoin": true,
    "categories": [
      "Staking",
      "Stablecoin"
    ],
    "logo": "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040",
    "createdAt": "2025-02-12T16:35:14.135Z",
    "updatedAt": "2025-02-12T16:35:14.135Z"
  },
  {
    "idProtocol": "CompoundV3_USDT",
    "addressToken": "0xbF1876d7643a1d7DA52C7B8a67e7D86aeeAA12A6",
    "addressStaking": "0xD1b1954896009800dF01b197A6E8E1d98FF44ae8",
    "nameToken": "USDT",
    "nameProject": "CompoundV3",
    "chain": "Pharos Devnet",
    "apy": 15,
    "tvl": 0,
    "stablecoin": true,
    "categories": [
      "Staking",
      "Stablecoin"
    ],
    "logo": "https://images.seeklogo.com/logo-png/32/1/tether-usdt-logo-png_seeklogo-323175.png",
    "createdAt": "2025-02-12T16:35:14.136Z",
    "updatedAt": "2025-02-12T16:35:14.136Z"
  },
  {
    "idProtocol": "Uniswap_UNI",
    "addressToken": "0x1eaC9BB63f8673906dBb75874356E33Ab7d5D780",
    "addressStaking": "0xa42A86906D3FDfFE7ccc1a4E143e5Ddd8dF0Cf83",
    "nameToken": "UNI",
    "nameProject": "Uniswap",
    "chain": "Pharos Devnet",
    "apy": 10,
    "tvl": 0,
    "stablecoin": false,
    "categories": [
      "Staking"
    ],
    "logo": "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=040",
    "createdAt": "2025-02-12T16:35:14.135Z",
    "updatedAt": "2025-02-12T16:35:14.135Z"
  },
  {
    "idProtocol": "UsdxMoney_WETH",
    "addressToken": "0x134C06B12eA6b1c7419a08085E0de6bDA9A16dA2",
    "addressStaking": "0x6c36eD76d3FF0A7C0309aef473052b487895Fadf",
    "nameToken": "WETH",
    "nameProject": "UsdxMoney",
    "chain": "Pharos Devnet",
    "apy": 20,
    "tvl": 0,
    "stablecoin": false,
    "categories": [
      "Staking"
    ],
    "logo": "https://img.cryptorank.io/coins/weth1701090834118.png",
    "createdAt": "2025-02-12T16:35:14.136Z",
    "updatedAt": "2025-02-12T16:35:14.136Z"
  }
]

const stakingABI = [
  "function fixedAPY() public view returns (uint8)",
  "function totalAmountStaked() public view returns (uint256)",
];

async function updateStakingData(index: number) {
  try {
    if (index >= MOCK_DATA.length) return;

    const { nameToken, token, staking, chain, nameProject, rpc } = MOCK_DATA[index];

    if (!rpc) {
      console.warn(`Missing RPC URL for ${nameProject} on ${chain}`);
      return;
    }

    const provider = new ethers.JsonRpcProvider(rpc);
    const contract = new ethers.Contract(staking, stakingABI, provider);

    const apy = await contract.fixedAPY();
    const totalStaked = await contract.totalAmountStaked();

    const formattedTVL = Number(ethers.formatUnits(totalStaked, 18));
    const formattedAPY = Number(apy);

    await prisma.staking.upsert({
      where: { idProtocol: nameProject + "_" + chain },
      update: {
        tvl: formattedTVL,
        apy: formattedAPY,
        updatedAt: new Date(),
      },
      create: {
        idProtocol: nameProject + "_" + staking,
        addressToken: token,
        addressStaking: staking,
        nameToken: nameToken,
        nameProject,
        chain,
        apy: formattedAPY,
        stablecoin: nameToken === "EDU",
        categories: ["Staking", nameToken === "EDU" ? "Stablecoin" : ""],
        logo: "https://s3.coinmarketcap.com/static-gravity/image/60f1fc5d85f2463881db170b6d740876.png",
        tvl: formattedTVL,
      },
    });

    console.log(`Updated staking data for ${nameProject} on ${chain}`);
  } catch (error) {
    console.error(`Error updating staking data for index ${index}:`, error);
  }
}

app.get("/staking", async (req: Request, res: Response) => {
  try {
    const data = await prisma.staking.findMany();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staking data" });
  }
});

app.get("/staking/protocol/:idProtocol", async (req: Request, res: Response) => {
  try {
    const { idProtocol } = req.params;
    const data = await prisma.staking.findMany({
      where: { idProtocol },
    });

    if (!data.length) {
      res.status(404).json({ error: "Staking data not found" });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staking data" });
  }
});

app.get("/staking/address/:addressStaking", async (req: Request, res: Response): Promise<void> => {
  try {
    const { addressStaking } = req.params;
    const data = await prisma.staking.findMany({
      where: { addressStaking: addressStaking },
    });

    if (!data || data.length === 0) {
      res.status(404).json({ error: "Staking data not found" });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staking data" });
  }
});

app.get("/token", async (req: Request, res: Response) => {
  try {
    res.json(MOCK_TOKEN_DATA);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch token data" });
  }
});

app.post("/staking/update", async (req: Request, res: Response) => {
  try {
    const updatePromises = MOCK_DATA.map((_, index) => updateStakingData(index));

    const results = await Promise.allSettled(updatePromises);

    const failedUpdates = results.filter((res) => res.status === "rejected");
    if (failedUpdates.length > 0) {
      console.warn(`Some updates failed: ${failedUpdates.length}`);
    }

    res.json({ message: "All staking data updated successfully", failedUpdates });
  } catch (error) {
    res.status(500).json({ error: "Failed to update staking data" });
  }
});

app.post("/staking/init", async (req: Request, res: Response) => {
  try {
    const initPromises = INIT_DATA.map(async (data) => {
      await prisma.staking.upsert({
        where: { idProtocol: data.idProtocol },
        update: data,
        create: data,
      });
    });

    await Promise.all(initPromises);
    res.json({ message: "Staking data initialized successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize staking data" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
