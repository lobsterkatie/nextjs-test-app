export function isBuild() {
  // @sentry/nextjs sets this env var
  return process.argv.includes("build") || process.env.SENTRY_BUILD_PHASE;
}
