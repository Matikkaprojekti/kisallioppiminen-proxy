export const resolveEnvVar = (envVar: string) => {
  const env = process.env.NODE_ENV.toUpperCase()
  return process.env[`${env}_${envVar}`]
}
