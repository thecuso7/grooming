export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  return {
    jwtSecret: config.jwtAccessSecret ? 'SET' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV,
    allEnv: Object.keys(process.env).filter(key => key.includes('JWT') || key.includes('SECRET'))
  }
});