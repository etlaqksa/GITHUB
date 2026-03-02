// Anti-inspect module - DISABLED for better UX and professional standards.
// The previous implementation blocked copy/paste (phone numbers, addresses), 
// harmed accessibility, and provided zero real security benefit.

export function isAntiInspectEnabled(): boolean {
  return false;
}

export function mountAntiInspectBlockers(): void {
  // No-op: anti-inspect is disabled to ensure professional UX.
}
