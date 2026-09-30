import app from './app.js';
import { ENV } from './config/env.js';

const PORT = parseInt(ENV.PORT, 10) || 5000;

// Only start the HTTP server when NOT on Vercel (local dev / traditional hosting)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`InvestWise AI Backend API Server active`);
    console.log(`Environment: ${ENV.NODE_ENV}`);
    console.log(`Listening on: http://localhost:${PORT}`);
    console.log(`Health Check: http://localhost:${PORT}/api/health`);
    console.log(`==================================================`);
  });
}

// Export app for Vercel serverless handler
export default app;
