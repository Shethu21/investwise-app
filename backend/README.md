# InvestWise AI Backend

Production-style Node.js + TypeScript + Express + Prisma + SQLite backend API for the InvestWise AI Investment Advisory System.

## Stack
- **Node.js & Express**: High-performance HTTP server
- **TypeScript**: Strict type safety
- **Prisma & SQLite**: Database ORM and local persistence
- **Groq API**: High-speed AI recommendation engine
- **Nodemailer**: Real-time 2FA OTP verification emails
- **Google Sheets API**: Operational telemetry and submission logging

## Getting Started

1. Install dependencies:
```bash
cd backend
npm install
```

2. Generate Prisma Client & Migrate SQLite Database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

3. Configure Environment Variables (`.env`):
Set `GROQ_API_KEY`, `SMTP_HOST`, etc. in `.env`.

4. Start Development Server:
```bash
npm run dev
```
The API server will run on `http://localhost:5000/api`.
