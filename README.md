# Cryptocurrency Stats API

A Node.js service that tracks cryptocurrency prices, market caps, and calculates price deviations using the CoinGecko API.

## Base URL

```
https://koinx-vzyc.onrender.com
```

## Available Endpoints

### 1. Get Latest Crypto Stats

Fetches the latest price, market cap, and 24-hour price change for a specified cryptocurrency.

```
GET /api/stats?coin={coinId}
```

**Parameters:**

- `coin` (required): One of the supported cryptocurrencies:
  - bitcoin
  - ethereum
  - matic-network

**Example Request:**

```bash
curl https://koinx-vzyc.onrender.com/api/stats?coin=ethereum
curl https://koinx-vzyc.onrender.com/api/stats?coin=bitcoin
curl https://koinx-vzyc.onrender.com/api/stats?coin=matic-network


```

**Example Response:**

```json
{
  "price": 3304.09,
  "marketCap": 397823738504.162,
  "24hChange": 0.107062844209485
}
```

### 2. Get Price Deviation

Calculates the standard deviation of the cryptocurrency's price over the last 100 records.

```
GET /api/deviation?coin={coinId}
```

**Parameters:**

- `coin` (required): One of the supported cryptocurrencies:
  - bitcoin
  - ethereum
  - matic-network

**Example Request:**

```bash
curl https://koinx-vzyc.onrender.com/api/deviation?coin=ethereum
curl https://koinx-vzyc.onrender.com/api/deviation?coin=bitcoin
curl https://koinx-vzyc.onrender.com/api/deviation?coin=matic-network
```

**Example Response:**

```json
{
  "deviation": 0.00052
}
```

## Setting Up Locally

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Create `.env` file with the following variables:

```
PORT=3000
MONGO_URL=mongodb_url
API_KEY=api_key
```

4. Start the server

```bash
node index.js
```

## Background Job

The service runs a background job every 2 hours to fetch the latest cryptocurrency data from CoinGecko and store it in the database.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- CoinGecko API
- node-cron

## Notes

- Price data is updated every 2 hours
- Standard deviation is calculated using the last 100 price records
- All monetary values are in USD
