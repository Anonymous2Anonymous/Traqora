export function validatePassengerNameNonLossy(name: string): void {
  for (let i = 0; i < name.length; i++) {
    const code = name.charCodeAt(i);
    // Reject control characters (C0/C1 control codes and DEL)
    if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) {
      throw new Error("Passenger name contains forbidden control characters");
    }
  }
}
