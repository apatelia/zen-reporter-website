import { test, expect } from '@playwright/test';

interface UserSession {
  id: string;
  authenticated: boolean;
}

export async function verifySession(session: UserSession): Promise<boolean> {
  // Check session validity
  if (!session.authenticated) {
    return false;
  }
  return session.id.length > 0;
}