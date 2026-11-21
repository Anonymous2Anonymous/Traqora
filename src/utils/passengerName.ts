export function validatePassengerName(name: string): boolean {
  if (!name || name.length === 0) {
    return false;
  }
  for (let i = 0; i < name.length; i++) {
    const code = name.charCodeAt(i);
    if ((code >= 0 && code < 32) || code === 127) {
      return false;
    }
  }
  return true;
}
