let cachedVersionPromise: Promise<string> | null = null;

const FALLBACK_VERSION = 'v0.14.1';

async function fetchLatestNpmVersion(): Promise<string> {
  try {
    const res = await fetch('https://registry.npmjs.org/@arpanp/zen-reporter/latest', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.version) {
        return `v${data.version}`;
      }
    }
  } catch {
    // Fall back to hardcoded version if offline or registry request fails
  }

  return FALLBACK_VERSION;
}

export function getLatestVersion(): Promise<string> {
  if (!cachedVersionPromise) {
    cachedVersionPromise = fetchLatestNpmVersion();
  }
  return cachedVersionPromise;
}
