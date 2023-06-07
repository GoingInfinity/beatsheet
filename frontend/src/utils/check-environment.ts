export default function checkEnvironment(): string {
    const envUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'http://localhost:8080'; // Haven't deployed vercel app yet
  
    return envUrl;
  }
  