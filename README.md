# 🚀 opti Backend

A simple Node.js API using Express, Prisma, and Ethers.js to fetch and update staking data on the Pharos Devnet network.

## 📌 Features
- Fetch staking data for multiple tokens
- Retrieve staking data by protocol ID or token address
- Update staking data from the blockchain

## 🛠️ Technologies Used
- **Node.js** (Express.js for backend framework)
- **Ethers.js** (for blockchain interaction)
- **Prisma** (for database management)
- **dotenv** (for environment variables)
- **CORS** (for cross-origin requests support)

## 🔧 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/optifi-pharos/backend.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env` file:
   ```env
   PORT=3000
   DATABASE_URL=your_database_url_here
   RPC_URL=https://devnet.dplabs-internal.com/
   ```
4. Run the server:
   ```sh
   npm start
   ```

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/staking` | Get all staking data |
| `GET` | `/staking/:idProtocol` | Get staking data by protocol ID |
| `GET` | `/staking/:address` | Get staking data by token address |
| `POST` | `/staking/update` | Update staking data from blockchain |

## 🔗 Token Contracts
| Token | Address | Staking Contract |
|--------|----------------------------------|----------------------------------|
| **UNI** | `0x49eA216d189B9E799711Fb78853c1dA85F2FECd5` | `0x77Ab4Df809ba5D432d209df0A427Dd06730438b6` |
| **USDC** | `0xa0471Db84Fd1A7094d46C06F73304aA2D7129CD3` | `0x766134D501efe40F9f3feb9df5dD3E333d4be9CC` |
| **USDT** | `0x693e493B99fdeeb524b056213FC3c0847d8Da4bc` | `0x135F2c540e8b95682D2C726c1cB0dB2f4929fe5B` |
| **DAI** | `0x3C60fA815cb652dc593dcB709BEc27b6A57fC41f` | `0xe334318C2c027f1714449eEa4757A692d2defD55` |
| **WETH** | `0xeC179Cb8CD08171449A6Ab47f1fbEbDf781f7De5` | `0x80D7F2AC11Bf1cfe7f534df9d2E1CEA50BC4ee50` |

## ⚡ Quick Test with cURL
Get all staking data:
```sh
curl -X GET http://localhost:3000/staking
```

Update staking data:
```sh
curl -X POST http://localhost:3000/staking/update
```

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
