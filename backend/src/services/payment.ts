// Helper: Luhn algorithm
export function luhnCheck(cardNumber: string): boolean {
  const s = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let double = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i]!, 10);
    if (double) {
      d = d * 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

// Helper : To detect card brand
export function detectCardBrand(cardNumber: string): string {
  const s = cardNumber.replace(/\D/g, "");
  if (/^4/.test(s)) return "Visa";
  if (/^5[1-5]/.test(s)) return "Mastercard";
  if (/^3[47]/.test(s)) return "AMEX";
  if (/^6(?:011|5)/.test(s) || /^64[4-9]/.test(s)) return "Discover";
  return "Unknown";
}

// Helper: Check valid expiry date
export function isExpiryValid(month: number, year: number): boolean {
  // year can be 2-digit or 4-digit; normalize
  const now = new Date();
  const normalizedYear = year < 100 ? 2000 + year : year;
  const exp = new Date(normalizedYear, month - 1, 1);
  // Set to end of expiry month
  exp.setMonth(exp.getMonth() + 1);
  return exp > now;
}


