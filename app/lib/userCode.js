/**
 * Generate a deterministic 6-character user code from a user ID.
 * Returns 'INDM-XXXXXX' format. Ported from Vue admin panel.
 */

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32-bit int
  }
  return hash;
}

export function generateUserCode(userId) {
  const hash = simpleHash(String(userId));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    code += chars[h % chars.length];
    h = Math.floor(h / chars.length);
  }
  return `INDM-${code}`;
}

export function formatUserDisplay(user) {
  if (!user) return { code: 'INDM-000000', displayText: 'Unknown', fullDisplay: 'Unknown' };
  const code = generateUserCode(user.id);
  const name = user.name || user.email?.split('@')[0] || 'User';
  return {
    code,
    displayText: `${code} - ${name}`,
    fullDisplay: `${code} - ${name} (${user.email || ''})`,
  };
}
