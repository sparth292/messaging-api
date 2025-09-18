# Bhosdike Prayag Java Se JavaScript me code ko convert kyu kiya ?

## Twilio Messaging Express API

Express.js API for sending and receiving SMS with Twilio. Ready for deployment on Railway.

### Prerequisites
- Node.js 18+
- Twilio account with a Messaging Service SID or phone number

### Setup
1. Install dependencies:
```
npm install
```
2. Copy env and fill values:
```
cp .env.example .env
# Edit .env with your credentials
```
3. Run locally:
```
npm run dev
```
The server listens on `PORT` (default 3000).

### Endpoints
- `GET /` – service info
- `GET /healthz` – health check
- `POST /twilio/send` – send SMS
  - JSON body: `{ "to": "+15551234567", "body": "Hello" }`
- `POST /twilio/webhook` – Twilio inbound SMS webhook receiver

### Railway Deployment
1. Push this repo to GitHub.
2. Create a new Railway project and deploy from your repo.
3. Set Environment Variables in Railway:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_MESSAGING_SERVICE_SID` or `TWILIO_PHONE_NUMBER`
   - Optional: `CORS_ORIGIN`
4. Railway sets `PORT` automatically; the server reads it.

### Notes
- Secrets are loaded from `.env` via `dotenv` and `.env` is gitignored.
- Java/Maven `target/` remains ignored in `.gitignore` for the original project artifacts.
